// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';

// Own models
import Contractor from '../../models/contractors/contractorModel';

// Own Factory
import * as companyFactory from '../companyFactory';
// // ================================================ Middlewares starts here =========================================
const uploadContractorDocs = companyFactory.uploadCompanyDocs;

const addContractor = (req: Request, res: Response, next: NextFunction) => {
	if (!req.body.company) req.body.company = req.params.idCompany;
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

export {
	getAllContractors,
	getContractor,
	createContractor,
	addContractor,
	acceptContractor,
	updateContractor,
	rejectContractor,
	uploadContractorDocs,
	getContractorNIT,
};
