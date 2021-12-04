// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';

// Importing our utils to this controller
import catchAsync from '../utils/catchAsync';
import HttpException from '../utils/httpException';
import APIFeatures from '../utils/apiFeatures';

import { TRDDependency } from '../models/trd/trdImportAll';
import User from '../models/users/userModel';
import Workflow from '../models/workflows/workflowModel';
import TRDOrdinary from '../models/trd/trdOrdinary';

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

const uploadPunctualWorkPerson = uploadOrdinaryPerson.fields([
	{ name: 'docCovid19', maxCount: 1 },
	{ name: 'docHealth', maxCount: 1 },
	{ name: 'docPension', maxCount: 1 },
	{ name: 'docSocialSecurity', maxCount: 1 },
	{ name: 'docCitizenship', maxCount: 1 },
]);

const uploadVisitorPerson = uploadOrdinaryPerson.fields([
	{ name: 'docCovid19', maxCount: 1 },
	{ name: 'docHealth', maxCount: 1 },
	{ name: 'docPension', maxCount: 1 },
	{ name: 'docSocialSecurity', maxCount: 1 },
	{ name: 'docCitizenship', maxCount: 1 },
]);
// AQUI TERMINA LOS UPLOADS MIDDLEWARES

const createOrdinary = (
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

		// CHECK IF THE DEPENDENCY (TRD) EXISTS
		const dependency = await TRDDependency.findById(body.dependency);

		if (!dependency) {
			return next(
				new HttpException('No se ha encontrado ningúna tipología creada!', 404)
			);
		}

		// NOW CHECK IF THERE HAS BEEN CONSECUTIVES BEFORE WITH THAT TRD, IF NOT CREATE ONE SEQUENCE.
		let trdOrdinary = await TRDOrdinary.findOne({
			dependency: body.dependency,
		});

		if (!trdOrdinary) {
			trdOrdinary = await TRDOrdinary.create({
				dependency: body.dependency,
			});
		}

		// GENERATING THE RADICADO NUMBER
		// 18 Dígitos nueva versión: 4 año + 4 dependencia + 4 serie/subserie + 5 consecutivo + E
		const year: number = new Date().getFullYear();

		const dependencyCode = dependency.dependencyCode;

		let consecutive = trdOrdinary.getConsecutive() + 1;
		consecutive = ('000000' + consecutive).slice(-6);

		const radicado = `${year}${dependencyCode}${consecutive}9`;

		// INCREMENT THE CONSECUTIVE
		trdOrdinary.consecutive = trdOrdinary.getConsecutive() + 1;
		await trdOrdinary.save({ validateBeforeSave: false });

		body.radicado = radicado;

		if (req.params.idCompany) body.companyID = req.params.idCompany;

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

		usersArray.forEach((ArrayPerRole: Array<any>) => {
			ArrayPerRole.forEach((element) => {
				usersID.push(element._id);
			});
		});

		const bodyWorkflow = {
			radicado: newOrdinaryPerson._id,
			ordinaryType: newOrdinaryPerson.ordinaryType,
			roles: usersID,
			observations: req.body.observations,
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

export {
	createOrdinary,
	uploadPermanentPerson,
	uploadPunctualWorkPerson,
	uploadVisitorPerson,
};
