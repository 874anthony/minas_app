// Import 3rd-party packages
import express from 'express';

// Importing own routers
import contractorRouter from '../../routes/contractors/contractorRoutes';
import ordinaryPersonRouter from '../../routes/ordinaries/ordinaryPersonRoutes';

// Importing own controllers
import * as companyController from '../../controllers/companies/companyController';

const router = express.Router();

// Nesting routes to redirect to contractorRouter
router.use('/:idCompany/contractors', contractorRouter);
router.use('/:idCompany/ordinaries-person', ordinaryPersonRouter);

// Custom routes
router
	.route('/pending-companies')
	.get(
		companyController.getPendingCompanies,
		companyController.getAllCompanies
	);

router.route('/login').post(companyController.loginCompany);

// Routes
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
