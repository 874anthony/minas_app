// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';

// Importing our utils to this controller
import HttpException from '../utils/httpException';
import catchAsync from '../utils/catchAsync';
import Email from '../utils/email';
import APIFeatures from '../utils/apiFeatures';

// Importing own models to the controller
import {
	TRDDependency,
	TRDSerie,
	TRDSubSerie,
} from '../models/trd/trdImportAll';

import TRD, { TrdInterface } from '../models/trd/trdModel';
import { StatusCompany } from '../models/companies/companyModel';

// Importing own interfaces
import { months } from '../utils/date';
import DtoCreateCompany from '../interfaces/company/post-createCompany';

// ================================== MULTER CONFIGURATION TO HANDLE THE DOCUMENTS ===========================================
// Configuring first the type of the storage
const multerStorage = multer.diskStorage({
	// Define the destination
	destination: (req: Request, file: Express.Multer.File, callback) => {
		let predicate;

		if (req.body.nit === undefined) {
			predicate = req['companyNit'];
		} else {
			predicate = req.body.nit;
		}

		const directory = `store/documents/company/${predicate}`;

		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory, { recursive: true });
		}

		callback(null, directory);
	},
	filename: (req: Request, file: Express.Multer.File, callback) => {
		let predicate;

		if (req.body.nit === undefined) {
			predicate = req['companyNit'];
		} else {
			predicate = req.body.nit;
		}

		// Extracting the extension.
		const extension = file.mimetype.split('/')[1];
		callback(null, `company-${predicate}-${Date.now()}.${extension}`);
	},
});

// Filtering for only PDF files
const multerFilter = (
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

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

// MIDDLEWARES STARTS HERE!
const getCompanyNIT = (Model) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const currentCompany = await Model.findById(id);

		if (!currentCompany) {
			return next(
				new HttpException(
					'No hay ningún ordinario con ese ID, intente nuevamente',
					404
				)
			);
		}

		req['companyNit'] = currentCompany.nit;
		next();
	});

// ================================================ Endpoints starts here =========================================
const uploadCompanyDocs = upload.fields([
	{ name: 'docComCam', maxCount: 1 },
	{ name: 'docRUT', maxCount: 1 },
	{ name: 'docLegalRepresentativeID', maxCount: 1 },
	{ name: 'docSocialSecurity', maxCount: 1 },
]);

const findAll = (Model) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const features = new APIFeatures(Model.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();
		const companies = await features.query;

		if (companies.length === 0) {
			return next(
				new HttpException('No hay empresas con ese criterio de búsqueda!', 204)
			);
		}

		return res.status(200).json({
			status: true,
			data: {
				companies,
			},
		});
	});

/**
 * Obtener empresa por el ID;
 * @param id
 */
const findOne = (Model, populateOptions?) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		let query = Model.findById(id);

		if (populateOptions) query = query.populate(populateOptions);

		const company = await query;

		if (!company) {
			return next(new HttpException('No hay una empresa con este ID', 404));
		}

		return res.status(200).json({
			status: true,
			company,
		});
	});

const createOne = (Model) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		if (!req.files) {
			return next(
				new HttpException(
					'No se han cargado todos los archivos, por favor inténtelo nuevamente',
					404
				)
			);
		}

		// Primero verificar si hay una compañia top
		if (req.body.companyID) {
			try {
				await Model.findById(req.body.companyID);
			} catch (error) {
				return next(
					new HttpException(
						'No hay una compañía con ese ID, inténtelo nuevamente',
						404
					)
				);
			}
		}

		const body: DtoCreateCompany = { ...req.body };

		// Looping through the req.files object to set it to the body
		Object.keys(req.files).forEach(
			(el) => (body[el] = req.files![el][0].filename)
		);

		if (body['docSocialSecurity']) {
			body['docSocialSecurity'] = {
				year: new Date().getFullYear().toString(),
				month: months[new Date().getMonth()],
				filename: req.files!['docSocialSecurity'][0].filename,
			};

			body['docSocialSecurityAt'] = Date.now();
		}

		const companyCreated = await Model.create(body);

		return res.status(201).json({
			status: true,
			message: 'La empresa se ha creado éxitosamente',
			company: companyCreated,
		});
	});

const updateOne = (Model) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		const companyUpdated = await Model.findById(id);

		if (!companyUpdated) {
			return next(
				new HttpException(
					'No hay una empresa con ese ID, intente nuevamente!',
					404
				)
			);
		}

		// Mutating the object req.body
		const body = { ...req.body };

		if (req.files) {
			// Looping through the req.files object to set it to the body
			Object.keys(req.files).forEach(
				(el) => (body[el] = req.files![el][0].filename)
			);
		}

		body['updatedAt'] = Date.now();

		if (body['docSocialSecurity']) {
			body['docSocialSecurity'] = {
				year: new Date().getFullYear().toString(),
				month: months[new Date().getMonth()],
				filename: req.files!['docSocialSecurity'][0].filename,
			};

			body['docSocialSecurityAt'] = Date.now();
		}

		Object.keys(body).forEach(async (key) => {
			if (
				key === 'observations' ||
				key === 'finishDates' ||
				key === 'docSocialSecurity'
			) {
				companyUpdated[key].push(body[key]);
			} else {
				companyUpdated[key] = body[key];
			}
		});

		if (body['password']) {
			const hashedPassword = await companyUpdated.hashPassword(
				body['password']
			);

			// NOW SAVE THE PASSWORD
			companyUpdated.password = hashedPassword;
		}

		await companyUpdated.save({ validateBeforeSave: false });

		res.status(200).json({
			status: true,
			message: 'Se ha actualizado la compañía con éxito',
			companyUpdated,
		});
	});

const rejectOne = (Model) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const { emailMessage } = req.body;

		const companyMatched = await Model.findById(id);

		// CHECK IF THE COMPANY EXISTS
		if (!companyMatched) {
			return next(
				new HttpException(
					'No existe una compañía con ese ID, inténtelo nuevamente',
					404
				)
			);
		}

		if (!req.body.isContractor) {
			try {
				await new Email(companyMatched).sendRejectCompany(emailMessage);
			} catch (error) {
				return next(
					new HttpException(
						'Hubo un error al enviar el correo, por favor intente más tarde',
						500
					)
				);
			}
		}

		await companyMatched.remove();

		// SENDING THE FINAL RESPONSE TO THE CLIENT
		return res.status(204).json({
			status: true,
			message:
				'La empresa fue rechazada y se le envió un correo con las observaciones',
		});
	});

const acceptOne = (Model) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const body: TrdInterface = { ...req.body };

		const companyMatched = await Model.findById(id);

		// CHECK IF THE COMPANY EXISTS
		if (!companyMatched) {
			return next(
				new HttpException(
					'No existe una compañía con ese ID, inténtelo nuevamente',
					404
				)
			);
		}

		// CHECK IF THE DEPENDENCY OR SERIE OR SUBSERIE (TRD) EXISTS
		const dependency = await TRDDependency.findById(body.dependency);
		const serie = await TRDSerie.findById(body.serie);
		const subserie = await TRDSubSerie.findById(body.subserie);

		if (!dependency || !serie || !subserie) {
			return next(
				new HttpException('No se ha encontrado ningúna tipología creada!', 404)
			);
		}

		// NOW CHECK IF THERE HAS BEEN CONSECUTIVES BEFORE WITH THAT TRD, IF NOT CREATE ONE SEQUENCE.
		let trd = await TRD.findOne({
			dependency: body.dependency,
			serie: body.serie,
			subserie: body.subserie,
		});

		if (!trd) {
			trd = await TRD.create({
				dependency: body.dependency,
				serie: body.serie,
				subserie: body.subserie,
			});
		}

		// GENERATING THE RADICADO NUMBER
		// 18 Dígitos nueva versión: 4 año + 4 dependencia + 4 serie/subserie + 5 consecutivo + E
		const year: number = new Date().getFullYear();

		const dependencyCode = dependency.dependencyCode;
		const serieCode = serie.serieCode;
		const subserieCode = subserie.subSerieCode;

		let consecutive = trd.getConsecutive() + 1;
		consecutive = ('00000' + consecutive).slice(-5);

		const radicado = `${year}${dependencyCode}${serieCode}${subserieCode}${consecutive}E`;

		// INCREMENT THE CONSECUTIVE
		trd.consecutive = trd.getConsecutive() + 1;
		await trd.save({ validateBeforeSave: false });

		const genPassword = await companyMatched.generatePassword();
		const hashedPassword = await companyMatched.hashPassword(genPassword);

		// NOW SAVE THE RADICADO, THE STATUS, PASSWORD AND THE UPDATED AT
		companyMatched.password = hashedPassword;
		companyMatched.radicado = radicado;
		companyMatched.status = StatusCompany.Active;
		companyMatched.updatedAt = Date.now();

		// To save observations as well
		if (req.body.observations)
			companyMatched.observations.push(req.body.observations);

		await companyMatched.save({ validateBeforeSave: false });

		const companyCredentials = {
			genPassword,
			radicado,
			email: companyMatched.email,
		};

		if (!req.body.isContractor) {
			try {
				await new Email(companyMatched).sendWelcomeCompany(companyCredentials);
			} catch (error) {
				return next(
					new HttpException(
						'Hubo un error al enviar el correo, por favor intente más tarde',
						500
					)
				);
			}
		}

		// SENDING THE FINAL RESPONSE TO THE CLIENT
		return res.status(200).json({
			status: true,
			message:
				'La empresa fue aprobada éxitosamente y se le envió un correo con sus credenciales',
			radicado,
		});
	});

export {
	createOne,
	findAll,
	findOne,
	acceptOne,
	rejectOne,
	updateOne,
	uploadCompanyDocs,
	getCompanyNIT,
};
