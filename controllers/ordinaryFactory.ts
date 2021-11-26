// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';

// Importing our utils to this controller
import catchAsync from '../utils/catchAsync';
import HttpException from '../utils/httpException';
import APIFeatures from '../utils/apiFeatures';

// Import own models
import User from '../models/users/userModel';
import Workflow, { StatusWorkflow } from '../models/workflows/workflowModel';

// ================================== MULTER CONFIGURATION TO HANDLE THE DOCUMENTS ===========================================
// Configuring first the type of the storage
const multerStorageOrdinary = multer.diskStorage({
	// Define the destination
	destination: (req: Request, file: Express.Multer.File, callback) => {
		const directory = `store/documents/ordinaries/person/${req.body.citizenship}`;

		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory, { recursive: true });
		}

		callback(null, directory);
	},
	filename: (req: Request, file: Express.Multer.File, callback) => {
		// Extracting the extension.
		const extension = file.mimetype.split('/')[1];
		callback(
			null,
			`ordinary-${req.body.citizenship}-${Date.now()}.${extension}`
		);
	},
});

// Filtering for only PDF files
const multerFilterOrdinary = (
	req: Request,
	file: Express.Multer.File,
	callback: any
) => {
	if (file.mimetype.split('/')[1] === 'pdf') {
		callback(null, true);
	} else {
		callback(
			new HttpException('No es un pdf, por favor, solo suba archivos PDF', 404),
			false
		);
	}
};

const uploadOrdinaryPerson = multer({
	storage: multerStorageOrdinary,
	fileFilter: multerFilterOrdinary,
});

// ================================================ Endpoints starts here =========================================

// UPLOADS MIDDLEWARES
const uploadPermanentPerson = uploadOrdinaryPerson.fields([
	{ name: 'docCovid19', maxCount: 1 },
	{ name: 'docHealth', maxCount: 1 },
	{ name: 'docPension', maxCount: 1 },
	{ name: 'docSocialSecurity', maxCount: 1 },
	{ name: 'docMedicalFitness', maxCount: 1 },
	{ name: 'docCitizenship', maxCount: 1 },
]);

const createOrdinay = (
	Model,
	Roles: Array<string>,
	checkRoles: Object,
	subsanarRoles?: Object
) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		if (!req.files) {
			return next(
				new HttpException(
					'No ha subido ningún archivo, intente nuevamente',
					404
				)
			);
		}

		// Mutating the object req.body
		const body = { ...req.body };

		// Looping through the req.files object to set it to the body
		Object.keys(req.files).forEach(
			(el) => (body[el] = req.files![el][0].filename)
		);

		const newOrdinaryPerson = await Model.create(body);

		if (!newOrdinaryPerson) {
			return next(
				new HttpException(
					'No se ha podido crear el ordinario, intente nuevamente',
					404
				)
			);
		}

		const usersPromises = Roles.map(async (role) => {
			const rolesQuery = new APIFeatures(User.find(), {
				role,
				status: 'true',
				fields: '_id,status',
			})
				.filter()
				.limitFields();

			return await rolesQuery.query;
		});

		const usersID: any = [];

		const usersArray = await Promise.all(usersPromises);
		usersArray[0].forEach((element) => usersID.push(element._id));

		const bodyWorkflow = {
			radicado: newOrdinaryPerson._id,
			roles: usersID,
			...checkRoles,
			...subsanarRoles,
		};

		try {
			await Workflow.create(bodyWorkflow);
		} catch (error) {
			return next(
				new HttpException(
					'No se ha asignado correctamente el workflow, por favor vuelva a intentar',
					500
				)
			);
		}

		res.status(200).json({
			status: true,
			message: 'Se ha creado el ordinario con éxito',
			ordinary: newOrdinaryPerson,
		});
	});

const getAllOrdinariesType = (Model) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const features = new APIFeatures(Workflow.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const ordinaries = await features.query.populate({
			path: 'radicado',
			select: '-__v',
			model: Model,
		});

		if (ordinaries.length === 0) {
			return next(new HttpException('No hay permanentes pendientes!', 204));
		}

		res.status(200).json({
			status: true,
			ordinaries,
		});
	});

const changeStatusOrdinary = () =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const body = { ...req.body };

		const workflowDoc = await Workflow.findById(id);

		if (!workflowDoc) {
			return next(
				new HttpException('No existe ese proceso, intente nuevamente', 404)
			);
		}

		Object.entries(body).forEach(([field, value]) => {
			workflowDoc[field] = value;
		});

		workflowDoc.status = StatusWorkflow.Rehabilitation;

		await workflowDoc.save({ validateBeforeSave: false });

		res
			.status(200)
			.json({ status: true, message: 'El proceso fue actualizado con éxito' });
	});

export {
	getAllOrdinariesType,
	changeStatusOrdinary,
	createOrdinay,
	uploadPermanentPerson,
};
