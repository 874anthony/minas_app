// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';

// Importing our utils to this controller
import HttpException from '../utils/httpException';
import catchAsync from '../utils/catchAsync';

// Importing own interfaces
import DtoCreateCompany from '../interfaces/company/post-createCompany';

// ================================== MULTER CONFIGURATION TO HANDLE THE DOCUMENTS ===========================================
// Configuring first the type of the storage
const multerStorage = multer.diskStorage({
	// Define the destination
	destination: (req: Request, file: Express.Multer.File, callback) => {
		const directory = `store/documents/company/${req.body.nit}`;

		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory);
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
		if (req.query.status) filter['status'] = req.query.status;

		const companies = await Model.find(filter);

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

export { createOne, findAll, findOne, uploadCompanyDocs };
