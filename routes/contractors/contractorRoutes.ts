import express from 'express';

// Importing own controllers
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

// Routes with the id
router.route('/:id').get(contractorController.getContractor);

export default router;
