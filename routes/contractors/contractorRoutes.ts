import express from 'express';

// Importing own controllers
import * as contractorController from '../../controllers/contractor/contractorController';

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

// Enabling the mergeParams to get access to the idCompany
const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(contractorController.getAllContractors)
	.post(
		contractorController.uploadContractorDocs,
		contractorController.addContractor,
		contractorController.createContractor
	);

router.use(
	'/:idContractor/ordinaries-person/permanent-person',
	permanentPersonRouter
);
router.use(
	'/:idContractor/ordinaries-person/punctual-work-person',
	punctualworkPersonRouter
);
router.use(
	'/:idContractor/ordinaries-person/special-work-person',
	specialworkPersonRouter
);
router.use(
	'/:idContractor/ordinaries-person/visitor-person',
	visitorPersonRouter
);

router.use(
	'/:idContractor/ordinaries-vehicle/visitor-vehicle',
	visitorVehicleRouter
);
router.use(
	'/:idContractor/ordinaries-vehicle/permanent-light-vehicle',
	permanentLightVehicleRouter
);
router.use(
	'/:idContractor/ordinaries-vehicle/permanent-heavy-vehicle',
	permanentHeavyVehicleRouter
);
router.use(
	'/:idContractor/ordinaries-vehicle/punctual-light-vehicle',
	punctualLightVehicleRouter
);
router.use(
	'/:idContractor/ordinaries-vehicle/punctual-heavy-vehicle',
	punctualHeavyVehicleRouter
);
router.use(
	'/:idContractor/ordinaries-vehicle/special-punctual-heavy-vehicle',
	specialpunctualHeavyVehicleRouter
);

// Routes with the id
router
	.route('/:id')
	.get(contractorController.getContractor)
	.put(
		contractorController.getContractorNIT,
		contractorController.uploadContractorDocs,
		contractorController.updateContractor
	);

// Custom routes
router
	.route('/pending-contractors')
	.get(
		contractorController.getPendingContractors,
		contractorController.getAllContractors
	);

router
	.route('/accept-pending-contractor/:id')
	.patch(contractorController.acceptContractor);

router
	.route('/reject-pending-contractor/:id')
	.delete(contractorController.rejectContractor);

export default router;
