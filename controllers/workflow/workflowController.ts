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
import Event from '../../models/events/eventsModel';

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
		'specialworkPerson',
		'visitorVehicle',
		'permanentLightVehicle',
		'permanentHeavyVehicle',
		'punctualLightVehicle',
		'punctualHeavyVehicle',
		'specialpunctualHeavyVehicle',
	],
	'Responsabilidad Social Empresarial': ['permanentPerson'],
	'Seguridad y Salud en el Trabajo': [
		'permanentPerson',
		'specialworkPerson',
		'permanentLightVehicle',
		'permanentHeavyVehicle',
		'specialpunctualHeavyVehicle',
	],
	'Seguridad Física': ['permanentPerson'],
	Interventoría: [
		'permanentPerson',
		'specialworkPerson',
		'permanentLightVehicle',
		'permanentHeavyVehicle',
		'specialpunctualHeavyVehicle',
	],
	'Gerencia Servicios Mineros': ['permanentPerson'],
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
					populate: {
						path: 'companyID',
						select: 'businessName',
					},
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

		const user = await User.findById(userID);

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

		// To handle events
		let action, description;

		// Extracting the key given the value of the enum.
		const checkKey = getKey('check', user);
		const correctKey = getKey('correct', user);

		if (checkKey === 'checkSSFF' && body.check === false) {
			const Model = getModel(workflowDoc.ordinaryType);

			const docMatched = await Model.findById(workflowDoc.radicado);

			action = 'Actualización Tramitador - Rechazado';
			description = `El registro ha sido anulado por ${user.role}`;

			docMatched.status = StatusOrdinary.Forbidden;
			await docMatched.save({ validateBeforeSave: false });

			await workflowDoc.remove();

			return res.status(204).json({
				status: true,
				message: 'El proceso ha sido actualizado con éxito',
			});
		}

		// Modify the status.
		workflowDoc[checkKey] = body.check;
		workflowDoc[correctKey] = body.correct;

		if (req.body.observations) {
			const Model = getModel(workflowDoc.ordinaryType);
			const docMatched = await Model.findById(workflowDoc.radicado);

			docMatched.observations.push(req.body.observations);

			await docMatched.save({ validateBeforeSave: false });
		}

		if (body.check === false && body.correct === true) {
			action = 'Actualización Tramitador - Subsanar';
			description = `Se mandado a subsanar por ${user.role}`;
		} else if (body.check === true && body.correct === false) {
			action = 'Actualización Tramitador - Aprobado';
			description = `El registro ha pasado la aprobación de ${user.role}`;
		}

		const bodyEvent = {
			radicado: workflowDoc.radicado,
			action,
			description,
		};

		await Event.create(bodyEvent);

		await workflowDoc.save({ validateBeforeSave: false });

		res
			.status(200)
			.json({ status: true, message: 'El proceso fue actualizado con éxito' });
	}
);

const getOneWorkflow = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		const workflowDoc = await Workflow.findOne({ radicado: id });

		if (!workflowDoc)
			return next(
				new HttpException('No se ha encontrado un workflow con ese ID!', 404)
			);

		res.status(200).json({
			status: true,
			workflow: workflowDoc,
		});
	}
);

export {
	checkRole,
	getAllOrdinariesType,
	changeStatusOrdinary,
	getOneWorkflow,
};
