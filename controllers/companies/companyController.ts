// Mongoose imports
import { NextFunction, Request, Response } from 'express';

// Importing the global handler error and the catchAsync
import HttpException from '../../utils/httpException';
import catchAsync from '../../utils/catchAsync';

// Own models
import Company from '../../models/companies/companyModel';
import TRD, { TrdInterface } from '../../models/trd/trdModel';
import {
	TRDDependency,
	TRDSerie,
	TRDSubSerie,
} from '../../models/trd/trdImportAll';

// Own DTO Pattern
import DtoCreateCompany from '../../interfaces/company/post-createCompany';

// ================================================ Endpoints starts here =========================================
const getAllCompanies = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const companies = await Company.find({});

		if (companies.length === 0) {
			return next(new HttpException('No hay empresas creadas aún!', 204));
		}

		return res.status(200).json({
			status: true,
			data: {
				companies,
			},
		});
	}
);

/**
 * Obtener empresa por el ID;
 * @param id
 */
const getCompany = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const company = await Company.findById(id);

		if (!company) {
			return next(new HttpException('No hay una empresa con este ID', 404));
		}

		return res.status(200).json({
			status: true,
			company,
		});
	}
);

const createCompany = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const body: DtoCreateCompany = req.body;
		const companyCreated = await Company.create(body);

		return res.status(201).json({
			status: true,
			message: 'La empresa se ha creado éxitosamente',
			company: companyCreated,
		});
	}
);

// Approve a pending company and autogenerate 'Radicado'
const acceptCompany = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const body: TrdInterface = req.body;

		// CHECK IF THE COMPANY EXISTS
		const companyMatched = await Company.findById(id);

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
		companyMatched.pending = false;
		companyMatched.updatedAt = Date.now();

		await companyMatched.save({ validateBeforeSave: false });

		// SENDING THE FINAL RESPONSE TO THE CLIENT
		return res.status(200).json({
			status: true,
			message:
				'La empresa fue aprobada éxitosamente y se le envió un correo con sus credenciales',
			radicado,
		});
	}
);

export { getAllCompanies, getCompany, createCompany, acceptCompany };

// TODO: BETTER REFACTORING OF THE CODE AND SEND EMAIL
