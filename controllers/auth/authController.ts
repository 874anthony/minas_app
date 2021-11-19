// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';

// Importing our utils to this controller
import HttpException from '../../utils/httpException';
import catchAsync from '../../utils/catchAsync';

// Importing own interfaces
import DtoCreateUser from '../../interfaces/auth/post-createUser';

// Importing own models
import User, { UserRoles } from '../../models/users/userModel';

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

		res.status(200).json({
			status: true,
			message: `El usuario con el rol: ${body.role} fue creado con exito`,
			user: newUser,
		});
	}
);

export { createUserRole };
