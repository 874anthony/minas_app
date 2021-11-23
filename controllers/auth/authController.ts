// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// Importing our utils to this controller
import HttpException from '../../utils/httpException';
import catchAsync from '../../utils/catchAsync';

// Importing own interfaces
import DtoCreateUser from '../../interfaces/auth/post-createUser';

// Importing own models
import User, { UserRoles } from '../../models/users/userModel';

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY as string, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

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

const login = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		// 1) Check if email and password exist
		if (!email || !password) {
			return next(
				new HttpException('Por favor ingresa el email y la contraseña!', 400)
			);
		}

		// 2) Check if user exists && password is correct
		const user = await User.findOne({ email }).select('+password');

		if (!user || !((await user.decryptPassword(user.password!)) === password)) {
			return next(new HttpException('Email o contraseña incorrectos!', 401));
		}

		// 3) If everything ok, send token to client
		const token = signToken(user._id);

		res.status(200).json({
			status: true,
			message: 'Te has conectado con éxito',
			token,
		});
	}
);

export { createUserRole, login };
