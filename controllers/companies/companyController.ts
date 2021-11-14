// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';

// Importing our utils to this controller
import HttpException from '../../utils/httpException';
import catchAsync from '../../utils/catchAsync';
import sendEmail from '../../utils/email';

// Own models
import Contractor from '../../models/contractors/contractorModel';
import Company, { StatusCompany } from '../../models/companies/companyModel';
import TRD, { TrdInterface } from '../../models/trd/trdModel';
import {
	TRDDependency,
	TRDSerie,
	TRDSubSerie,
} from '../../models/trd/trdImportAll';

// Own Factory
import * as factory from '../companyFactory';

// // ================================================ Middlewares starts here =========================================
const uploadCompanyDocs = factory.uploadCompanyDocs;

const getPendingCompanies = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.query.status = 'PENDIENTE';
	next();
};

// // ================================================ Endpoints starts here =========================================

const getAllCompanies = factory.findAll(Company);
const getCompany = factory.findOne(Company, {
	path: 'contratistas',
	select: 'businessName nit email address phone legalRepresentative -company',
});
const createCompany = factory.createOne(Company);

// Approve a pending company and autogenerate 'Radicado'
const acceptCompany = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const body: TrdInterface = { ...req.body };

		let companyMatched;

		if (req.body.contractor === true) {
			companyMatched = await Contractor.findById(id);
		} else {
			companyMatched = await Company.findById(id);
		}

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
		\nEl correo: el mismo con el que se registró\nSu contraseña: ${genPassword}!\n\nSi tiene alguna duda, no dude en contactar con nosotros!`;

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
	}
);

export {
	getAllCompanies,
	getCompany,
	createCompany,
	acceptCompany,
	uploadCompanyDocs,
	getPendingCompanies,
};
