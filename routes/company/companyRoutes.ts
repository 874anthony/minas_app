// Import 3rd-party packages
import express from 'express';

// Importing own routers
import contractorRouter from '../../routes/contractors/contractorRoutes';
import permanentPersonRouter from '../ordinaries/persons/permanentPersonRoutes';
import punctualworkPersonRouter from '../ordinaries/persons/punctualworkPersonRoutes';
import specialworkPersonRouter from '../ordinaries/persons/specialworkPersonRoutes';
import visitorPersonRouter from '../ordinaries/persons/visitorPersonRoutes';
import workflowRouter from '../ordinaries/workflowRoutes';
import ordinariesRouter from '../ordinaries/ordinariesRoutes';

// Importing own controllers
import * as companyController from '../../controllers/companies/companyController';

const router = express.Router();

// Nesting routes to redirect to contractorRouter
router.use('/:idCompany/contractors', contractorRouter);
router.use('/:idCompany/workflow', workflowRouter);
router.use('/:idCompany/ordinaries', ordinariesRouter);
router.use(
	'/:idCompany/ordinaries-person/permanent-person',
	permanentPersonRouter
);
router.use(
	'/:idCompany/ordinaries-person/punctual-work-person',
	punctualworkPersonRouter
);
router.use(
	'/:idCompany/ordinaries-person/special-work-person',
	specialworkPersonRouter
);
router.use('/:idCompany/ordinaries-person/visitor-person', visitorPersonRouter);

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
router
	.route('/:id')
	.get(companyController.getCompany)
	.put(
		companyController.getCompanyNIT,
		companyController.uploadCompanyDocs,
		companyController.updateCompany
	);

router
	.route('/accept-pending-company/:id')
	.patch(companyController.acceptCompany);

router
	.route('/reject-pending-company/:id')
	.delete(companyController.rejectCompany);

export default router;
