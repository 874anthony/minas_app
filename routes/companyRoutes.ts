// Import 3rd-party packages
import express from 'express';

// Importing own controllers
import * as companyController from '../controllers/companies/companyController';

const router = express.Router();

// Routes without the id
router
	.route('/')
	.get(companyController.getAllCompanies)
	.post(companyController.uploadCompanyDocs, companyController.createCompany);

// Routes with the id
router.route('/:id').get(companyController.getCompany);

router
	.route('/accept-pending-company/:id')
	.patch(companyController.acceptCompany);

export default router;
