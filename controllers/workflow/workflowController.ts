// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';

// // Importing our utils to this controller
import HttpException from '../../utils/httpException';
import catchAsync from '../../utils/catchAsync';
import APIFeatures from '../../utils/apiFeatures';

import {
	ModelsOrdinary,
	StatusOrdinary,
} from '../../interfaces/ordinaries/ordinariesEnum';

// Importing own models
import User, { UserRoles } from '../../models/users/userModel';
import Workflow, { StatusWorkflow } from '../../models/workflows/workflowModel';

// Helpers methods
const getKey = (field: string, user) => {
	return `${field}${
		Object.keys(UserRoles)[Object.values(UserRoles).indexOf(user.role)]
	}`;
};

const getModel = (ordinaryType: string) => {
	return ModelsOrdinary[ordinaryType];
};

const ModelsPerRole = {
	'Control de Acceso': [
		'permanentPerson',
		'punctualworkPerson',
		'visitorPerson',
	],
};

// Helpers methods Ends HERE

// MIDDLEWARES STARTS HERE
const checkRole = (req: Request, res: Response, next: NextFunction) => {
	const userID = req['user']._id;
	req.query.roles = userID;
	next();
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

const changeStatusOrdinary = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const body = { ...req.body };

		const userID = req['user']._id;
		const excludedField = StatusWorkflow.Approved;

		const user = await User.findById(userID);

		// Check if they put 'POR VISAR' in the request.body
		if (Object.values(body).includes(excludedField)) {
			return next(
				new HttpException(
					'No se cambiar el status a Visado, intente nuevamente',
					404
				)
			);
		}

		if (!user) {
			return next(
				new HttpException(
					'No hay un usuario con ese token, inténtelo nuevamente!',
					401
				)
			);
		}

		const workflowDoc = await Workflow.findById(id);

		if (!workflowDoc) {
			return next(
				new HttpException(
					'No existe un proceso con ese ID, intente nuevamente',
					404
				)
			);
		}

		// Extracting the key given the value of the enum.
		const checkKey = getKey('check', user);
		const correctKey = getKey('correct', user);

		if (checkKey === 'checkSSFF') {
			const Model = getModel(workflowDoc.ordinaryType);

			const docMatched = await Model.findById(workflowDoc.radicado);

			docMatched.status = StatusOrdinary.Forbidden;
			await docMatched.save({ validateBeforeSave: false });

			await workflowDoc.remove();

			return res.status(204).json({
				status: true,
				message: 'Seguridad Física rechazó el proceso - Documento eliminado.',
			});
		}

		// Modify the status.
		workflowDoc[checkKey] = body.check;

		if (body.correct) workflowDoc[correctKey] = body.correct;

		if (req.body.observations) {
			workflowDoc.observations = body.observations;
		}

		if (body.status) workflowDoc.status = body.status;

		await workflowDoc.save({ validateBeforeSave: false });

		//CHECK IF ALL ROLES ACCEPTED
		const checkArray: any = [];

		Object.keys(workflowDoc._doc).forEach((el) => {
			if (el.startsWith('check')) {
				checkArray.push(el);
			}
		});

		const allTrues = checkArray.every(function (value) {
			return workflowDoc[value] === true;
		});

		if (allTrues) {
			const Model = getModel(workflowDoc.ordinaryType);

			const docMatched = await Model.findById(workflowDoc.radicado);

			docMatched.status = StatusOrdinary.Active;
			await docMatched.save({ validateBeforeSave: false });

			await workflowDoc.remove();
		}

		res
			.status(200)
			.json({ status: true, message: 'El proceso fue actualizado con éxito' });
	}
);

export { checkRole, getAllOrdinariesType, changeStatusOrdinary };
