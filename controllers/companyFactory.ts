// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';

// Importing our utils to this controller
import HttpException from '../utils/httpException';
import catchAsync from '../utils/catchAsync';
import sendEmail from '../utils/email';
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
import DtoCreateCompany from '../interfaces/company/post-createCompany';

// ================================== MULTER CONFIGURATION TO HANDLE THE DOCUMENTS ===========================================
// Configuring first the type of the storage
const multerStorage = multer.diskStorage({
	// Define the destination
	destination: (req: Request, file: Express.Multer.File, callback) => {
		const directory = `store/documents/company/${req.body.nit}`;

		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory, { recursive: true });
		}

		callback(null, directory);
	},
	filename: (req: Request, file: Express.Multer.File, callback) => {
		// Extracting the extension.
		const extension = file.mimetype.split('/')[1];
		callback(null, `company-${req.body.nit}-${Date.now()}.${extension}`);
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

// ================================================ Endpoints starts here =========================================
const uploadCompanyDocs = upload.fields([
	{ name: 'docComCam', maxCount: 1 },
	{ name: 'docRUT', maxCount: 1 },
	{ name: 'docLegalRepresentativeID', maxCount: 1 },
]);

const findAll = (Model) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		let filter = {};
		if (req.params.idCompany) filter = { company: req.params.idCompany };

		const features = new APIFeatures(Model.find(filter), req.query)
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
		if (
			!req.files ||
			!req.files['docComCam'] ||
			!req.files['docRUT'] ||
			!req.files['docLegalRepresentativeID']
		) {
			return next(
				new HttpException(
					'No se han cargado todos los archivos, por favor inténtelo nuevamente',
					404
				)
			);
		}

		// Primero verificar si hay una compañia top
		if (req.body.company) {
			try {
				await Model.findById(req.body.company);
			} catch (error) {
				return next(
					new HttpException(
						'No hay una compañía con ese ID, inténtelo nuevamente',
						404
					)
				);
			}
		}

		const body: DtoCreateCompany = req.body;

		// Extracting the filenames from the files
		body.docComCam = req.files['docComCam'][0].filename;
		body.docRUT = req.files['docRUT'][0].filename;
		body.docLegalRepresentativeID =
			req.files['docLegalRepresentativeID'][0].filename;

		const companyCreated = await Model.create(body);

		return res.status(201).json({
			status: true,
			message: 'La empresa se ha creado éxitosamente',
			company: companyCreated,
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
			companyMatched.observations = req.body.observations;

		await companyMatched.save({ validateBeforeSave: false });

		const emailMessage = `Ha sido aprobado su solicitud de acceso para la mina, la generación de su empresa se ha generado con el radicado: ${radicado}. Sus credenciales de accesos son las siguientes:
		\nEl correo: el mismo con el que se registró\nSu contraseña: ${genPassword}\n\nSi tiene alguna duda, no dude en contactar con nosotros!`;

		try {
			await sendEmail({
				email: companyMatched.email,
				subject: 'Ha sido aprobado su acceso a la Mina San Jorge!',
				message: emailMessage,
			});
		} catch (error) {
			return next(
				new HttpException(
					'Hubo un error al enviar el correo, por favor intente más tarde',
					500
				)
			);
		}

		// SENDING THE FINAL RESPONSE TO THE CLIENT
		return res.status(200).json({
			status: true,
			message:
				'La empresa fue aprobada éxitosamente y se le envió un correo con sus credenciales',
			radicado,
		});
	});

export { createOne, findAll, findOne, acceptOne, uploadCompanyDocs };