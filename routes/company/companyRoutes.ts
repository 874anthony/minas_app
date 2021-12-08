// Import 3rd-party packages
import express from 'express';

// Importing own routers
import contractorRouter from '../../routes/contractors/contractorRoutes';
import permanentPersonRouter from '../ordinaries/persons/permanentPersonRoutes';
import punctualworkPersonRouter from '../ordinaries/persons/punctualworkPersonRoutes';
import specialworkPersonRouter from '../ordinaries/persons/specialworkPersonRoutes';
import visitorPersonRouter from '../ordinaries/persons/visitorPersonRoutes';
import visitorVehicleRouter from '../ordinaries/vehicles/light/visitorlightVehicleRoutes';
import permanentLightVehicleRouter from '../ordinaries/vehicles/light/permanentlightVehicleRoutes';
import permanentHeavyVehicleRouter from '../ordinaries/vehicles/heavy/permanentheavyVehicleRoutes';
import punctualLightVehicleRouter from '../ordinaries/vehicles/light/punctuallightVehicleRoutes';
import punctualHeavyVehicleRouter from '../ordinaries/vehicles/heavy/punctualheavyVehicleRoutes';
import specialpunctualHeavyVehicleRouter from '../ordinaries/vehicles/heavy/specialpunctualheavyVehicleRoutes';
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

router.use(
	'/:idCompany/ordinaries-vehicle/visitor-vehicle',
	visitorVehicleRouter
);
router.use(
	'/:idCompany/ordinaries-vehicle/permanent-light-vehicle',
	permanentLightVehicleRouter
);
router.use(
	'/:idCompany/ordinaries-vehicle/permanent-heavy-vehicle',
	permanentHeavyVehicleRouter
);
router.use(
	'/:idCompany/ordinaries-vehicle/punctual-light-vehicle',
	punctualLightVehicleRouter
);
router.use(
	'/:idCompany/ordinaries-vehicle/punctual-heavy-vehicle',
	punctualHeavyVehicleRouter
);
router.use(
	'/:idCompany/ordinaries-vehicle/special-punctual-heavy-vehicle',
	specialpunctualHeavyVehicleRouter
);

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
