// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';

// // Importing our utils to this controller
import HttpException from '../../utils/httpException';
import catchAsync from '../../utils/catchAsync';
import APIFeatures from '../../utils/apiFeatures';

import { ModelsOrdinary } from '../../interfaces/ordinaries/ordinariesEnum';

// Importing own models
import User from '../../models/users/userModel';
import Workflow from '../../models/workflows/workflowModel';

const checkRole = (req: Request, res: Response, next: NextFunction) => {
	const userID = req['user']._id;
	req.query.roles = userID;
	next();
};

const ModelsPerRole = {
	'Control de Acceso': ['permanentPerson', 'punctualworkPerson'],
};

// METHODS STARTS HERE
const getAllOrdinariesType = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		let queryModified = { ...req.query };

		const userID = req['user']._id;
		const user = await User.findById(userID);

		if (!user) {
			return next(
				new HttpException(
					'No hay un usuario logeado con ese ID, intente nuevamente',
					401
				)
			);
		}

		const ordinariesPopulated = ModelsPerRole[user.role].map(
			async (keyModel) => {
				const Model = ModelsOrdinary[keyModel];
				queryModified['ordinaryType'] = keyModel;

				console.log(queryModified);

				let populateQuery = new APIFeatures(Workflow.find(), queryModified)
					.filter()
					.limitFields()
					.sort()
					.paginate();

				let ordinaryResult = await populateQuery.query.populate({
					path: 'radicado',
					select: '-__v',
					model: Model,
				});

				return ordinaryResult;
			}
		);

		const ordinaries = await Promise.all(ordinariesPopulated);

		res.status(200).json({
			status: true,
			ordinaries,
		});
	}
);

export { checkRole, getAllOrdinariesType };
