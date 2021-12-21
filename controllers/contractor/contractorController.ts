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

const getAllContractors = companyFactory.findAll(Contractor);
const getContractor = companyFactory.findOne(Contractor);
const createContractor = companyFactory.createOne(Contractor);
const updateContractor = companyFactory.updateOne(Contractor);
const acceptContractor = companyFactory.acceptOne(Contractor);
const rejectContractor = companyFactory.rejectOne(Contractor);
const getContractorNIT = companyFactory.getCompanyNIT(Contractor);

const inactiveOrdsByContractor = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const idContractor = req.params.id;

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

		res.status(200).json({
			status: true,
			message: 'Se ha inactivado a todos los ordinarios con éxito',
		});
	}
);

const job = new CronJob(
	'0 0 1 * *',
	async () => {
		const date = new Date();
		date.setMonth(date.getMonth() - 1); //1 month ago

		await Contractor.updateMany(
			{
				docSocialSecurityAt: { $lte: date },
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
	addContractor,
	getPendingContractors,
	contractorsByCompany,
};
