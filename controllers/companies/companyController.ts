// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';
import { CronJob } from 'cron';

// Own models
import Company from '../../models/companies/companyModel';

// Own Factory
import * as factory from '../companyFactory';
import { login } from '../auth/authController';

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
const updateCompany = factory.updateOne(Company);

// Approve a pending company and autogenerate 'Radicado'
const acceptCompany = factory.acceptOne(Company);
const rejectCompany = factory.rejectOne(Company);
const getCompanyNIT = factory.getCompanyNIT(Company);

const loginCompany = login(Company);

const job = new CronJob(
	'0 1 * * *',
	async () => {
		await Company.updateMany(
			{
				docSocialSecurityAt: { $lte: Date.now() },
			},
			{ status: 'REVISION', docSocialSecurityAt: null }
		);
	},
	null
);

job.start();

export {
	getAllCompanies,
	getCompany,
	createCompany,
	acceptCompany,
	rejectCompany,
	updateCompany,
	uploadCompanyDocs,
	getPendingCompanies,
	loginCompany,
	getCompanyNIT,
};
