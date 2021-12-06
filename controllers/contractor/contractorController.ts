// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';

// Own models
import Contractor from '../../models/contractors/contractorModel';

// Own Factory
import * as factory from '../companyFactory';
// // ================================================ Middlewares starts here =========================================
const uploadContractorDocs = factory.uploadCompanyDocs;

const addContractor = (req: Request, res: Response, next: NextFunction) => {
	if (!req.body.company) req.body.company = req.params.idCompany;
	next();
};

// // ================================================ Endpoints starts here =========================================

const getAllContractors = factory.findAll(Contractor);
const getContractor = factory.findOne(Contractor);
const createContractor = factory.createOne(Contractor);
const acceptContractor = factory.acceptOne(Contractor);
const rejectContractor = factory.rejectOne(Contractor);

export {
	getAllContractors,
	getContractor,
	createContractor,
	addContractor,
	acceptContractor,
	rejectContractor,
	uploadContractorDocs,
};
