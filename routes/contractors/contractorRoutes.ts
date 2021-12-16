import express from 'express';

// Importing own controllers
import permanentPersonRouter from '../ordinaries/persons/permanentPersonRoutes';
import * as contractorController from '../../controllers/contractor/contractorController';

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

// Routes with the id
router
	.route('/:id')
	.get(contractorController.getContractor)
	.put(
		contractorController.getContractorNIT,
		contractorController.uploadContractorDocs,
		contractorController.updateContractor
	);

router
	.route('/accept-pending-contractor/:id')
	.patch(contractorController.acceptContractor);

router
	.route('/reject-pending-contractor/:id')
	.delete(contractorController.rejectContractor);

export default router;
