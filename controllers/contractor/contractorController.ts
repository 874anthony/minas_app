// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';
import { CronJob } from 'cron';

// Own models
import HttpException from '../../utils/httpException';
import Contractor from '../../models/contractors/contractorModel';
import { ModelsOrdinary } from '../../interfaces/ordinaries/ordinariesEnum';

// Own Factory
import * as companyFactory from '../companyFactory';
import catchAsync from '../../utils/catchAsync';
import APIFeatures from '../../utils/apiFeatures';

// // ================================================ Middlewares starts here =========================================
// Middlewares
const uploadContractorDocs = companyFactory.uploadCompanyDocs;

const addContractor = (req: Request, res: Response, next: NextFunction) => {
	if (!req.body.companyID) req.body.companyID = req.params.idCompany;
	next();
};

const contractorsByCompany = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.params.idCompany)
		return next(
			new HttpException(
				'No hay ID de la compañia padre, intente nuevamente',
				404
			)
		);

	req.query.companyID = req.params.idCompany;
	next();
};

const getPendingContractors = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.query.status = 'PENDIENTE';
	next();
};

// // ================================================ Endpoints starts here =========================================

const getAllContractors = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		let features = new APIFeatures(Contractor.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const contractors = await features.query.populate([
			{
				path: 'companyID',
				select: 'businessName status',
			},
		]);

		if (contractors.length === 0) {
			return next(
				new HttpException(
					'No hay documentos con ese criterio de búsqueda!',
					204
				)
			);
		}

		return res.status(200).json({
			status: true,
			data: {
				contractors,
			},
		});
	}
);

const getContractor = companyFactory.findOne(Contractor);
const createContractor = companyFactory.createOne(Contractor);
const updateContractor = companyFactory.updateOne(Contractor);
const acceptContractor = companyFactory.acceptOne(Contractor);
const rejectContractor = companyFactory.rejectOne(Contractor);
const getContractorNIT = companyFactory.getCompanyNIT(Contractor);

const inactiveOrdsByContractor = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { idContractor } = req.params;

		Object.values(ModelsOrdinary).forEach(async (Model) => {
			await Model.updateMany(
				{
					$match: {
						$and: [{ contractorID: idContractor }, { status: 'ACTIVO' }],
					},
				},
				{
					$set: { status: 'INACTIVO', qrCodeDate: null },
				}
			);
		});

		await Contractor.findByIdAndUpdate(
			idContractor,
			{ status: 'INACTIVO' },
			{ new: true, validateBeforeSave: false }
		);

		res.status(200).json({
			status: true,
			message: 'Se ha inactivado a todos los ordinarios con éxito',
		});
	}
);

const activeOrdsByContractor = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { idContractor } = req.params;

		Object.values(ModelsOrdinary).forEach(async (Model) => {
			await Model.updateMany(
				{
					$match: {
						$and: [{ contractorID: idContractor }, { status: 'INACTIVO' }],
					},
				},
				{
					$set: { status: 'ACTIVO' },
				}
			);
		});

		await Contractor.findByIdAndUpdate(
			idContractor,
			{ status: 'ACTIVO' },
			{ new: true, validateBeforeSave: false }
		);

		res.status(200).json({
			status: true,
			message: 'Se ha activado a todos los ordinarios con éxito',
		});
	}
);

const job = new CronJob(
	'0 1 * * *',
	async () => {
		await Contractor.updateMany(
			{
				docSocialSecurityAt: { $lte: Date.now() },
			},
			{
				$set: { status: 'REVISION', docSocialSecurityAt: null },
			}
		);
	},
	null
);

job.start();

export {
	getAllContractors,
	getContractor,
	createContractor,
	acceptContractor,
	updateContractor,
	rejectContractor,
	uploadContractorDocs,
	getContractorNIT,
	inactiveOrdsByContractor,
	activeOrdsByContractor,
	addContractor,
	getPendingContractors,
	contractorsByCompany,
};
