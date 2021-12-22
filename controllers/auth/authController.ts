// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Importing our utils to this controller
import HttpException from '../../utils/httpException';
import catchAsync from '../../utils/catchAsync';

// Importing own interfaces
import DtoCreateUser from '../../interfaces/auth/post-createUser';

// Importing own models
import User, { UserRoles } from '../../models/users/userModel';
import {
	getModelByType,
	ModelsOrdinary,
} from '../../interfaces/ordinaries/ordinariesEnum';

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY as string, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const isAllowedOrdinary = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id, ordinaryType } = req.params;

		if (!id || !ordinaryType)
			return next(
				new HttpException(
					'No ha proporcinado el tipo de ordinario, intente nuevamente',
					404
				)
			);

		const currentOrdinary = await ModelsOrdinary[ordinaryType]
			.findById(id)
			.populate([
				{
					path: 'companyID',
					select: 'businessName',
				},
				{
					path: 'contractorID',
					select: 'businessName',
					populate: {
						path: 'companyID',
						select: 'businessName',
					},
				},
			]);

		let ejsOpts: Object = {
			status: `<li style="color: ${
				currentOrdinary.status === 'INACTIVO' ? 'red' : 'green'
			};"> ${currentOrdinary.status} </li>`,
			name: `${
				currentOrdinary.name !== undefined
					? currentOrdinary.name
					: currentOrdinary.vehicleType
			}`,
			ordType: `${
				ordinaryType === 'specialworkPerson'
					? currentOrdinary.specialType
					: getModelByType[ordinaryType]
			}`,
			number: `${
				currentOrdinary.citizenship !== undefined
					? currentOrdinary.citizenship
					: currentOrdinary.vehicleNumber
			}`,
			type: `${
				currentOrdinary.gender !== undefined
					? currentOrdinary.gender
					: currentOrdinary.type
			}`,
			occupation: `${
				currentOrdinary.appointment !== undefined
					? currentOrdinary.appointment
					: currentOrdinary.serviceType
			}`,
			company: `${
				currentOrdinary.companyID !== undefined
					? currentOrdinary['companyID'].businessName
					: currentOrdinary['contractorID'].companyID['businessName']
			}`,
			contractor: `${
				currentOrdinary.contractorID !== undefined
					? currentOrdinary['contractorID'].businessName
					: 'Sin contratista'
			}`,
		};

		res.render(`${__dirname}/../../views/pages/qrcode.ejs`, ejsOpts);
	}
);

const createUserRole = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const body: DtoCreateUser = { ...req.body };
		const excludedField = UserRoles.Admin;

		// Check if they put 'Admin' in the request.body
		if (Object.values(body).includes(excludedField)) {
			return next(
				new HttpException(
					'No se puede crear usuarios administradores, intente nuevamente',
					404
				)
			);
		}

		const newUser = await User.create(body);
		const token = signToken(newUser._id);

		// Hide password from the output
		newUser.password = undefined;

		res.status(200).json({
			status: true,
			message: `El usuario con el rol: ${body.role} fue creado con exito`,
			token,
			user: newUser,
		});
	}
);

const login = (Model) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		// 1) Check if email and password exist
		if (!email || !password) {
			return next(
				new HttpException('Por favor ingresa el email y la contraseña!', 400)
			);
		}

		// 2) Check if user exists && password is correct
		const user = await Model.findOne({ email }).select('+password');

		if (!user || !((await user.decryptPassword(user.password!)) === password)) {
			return next(new HttpException('Email o contraseña incorrectos!', 401));
		}

		if (user.status === false) {
			return next(
				new HttpException(
					'Este usuario está inactivo. Contactar administrador',
					401
				)
			);
		}

		// 3) If everything ok, send token to client
		const token = signToken(user._id);

		res.status(200).json({
			status: true,
			message: 'Te has conectado con éxito',
			id: user._id,
			roleType: user.role,
			token,
		});
	});

const guardLogin = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		let token;

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		}

		if (!token) {
			return next(
				new HttpException(
					'No has iniciado sesión, por favor hazlo e intenta nuevamente',
					401
				)
			);
		}

		let id;
		jwt.verify(token, process.env.JWT_PRIVATE_KEY!, (err, decoded) => {
			id = decoded.id;
		});

		const currentUser = await User.findById(id);

		if (!currentUser) {
			return next(
				new HttpException('El usuario con este token ya no existe!', 401)
			);
		}

		req['user'] = currentUser;
		next();
	}
);

const loginUsers = login(User);

const adminGuard = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		let token;

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		}

		if (!token) {
			return next(
				new HttpException(
					'No has iniciado sesión, por favor hazlo e intenta nuevamente',
					401
				)
			);
		}

		let id;
		jwt.verify(token, process.env.JWT_PRIVATE_KEY!, (err, decoded) => {
			id = decoded.id;
		});

		const currentUser = await User.findById(id);

		if (!currentUser) {
			return next(
				new HttpException('El usuario con este token ya no existe!', 401)
			);
		}

		res.status(200).json({
			isAdmin: currentUser.role === UserRoles.Admin,
		});
	}
);

export {
	createUserRole,
	login,
	loginUsers,
	guardLogin,
	isAllowedOrdinary,
	adminGuard,
};
