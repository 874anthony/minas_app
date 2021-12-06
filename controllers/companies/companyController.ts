// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';

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

// Approve a pending company and autogenerate 'Radicado'
const acceptCompany = factory.acceptOne(Company);
const rejectCompany = factory.rejectOne(Company);

const loginCompany = login(Company);

export {
	getAllCompanies,
	getCompany,
	createCompany,
	acceptCompany,
	rejectCompany,
	uploadCompanyDocs,
	getPendingCompanies,
	loginCompany,
};
