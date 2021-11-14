// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';

// // Importing our utils to this controller
// import HttpException from '../../utils/httpException';
// import catchAsync from '../../utils/catchAsync';
// import sendEmail from '../../utils/email';

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

export {
	getAllContractors,
	getContractor,
	createContractor,
	addContractor,
	uploadContractorDocs,
};
