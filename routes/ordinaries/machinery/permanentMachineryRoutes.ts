// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as permanentMachineryController from '../../../controllers/ordinaries/machinery/permanentMachineryController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(
		permanentMachineryController.uploadPermanentMachinery,
		permanentMachineryController.createPermanentMachinery
	);

router
	.route('/:id')
	.put(
		permanentMachineryController.getVehicleNumber,
		permanentMachineryController.uploadPermanentMachinery,
		permanentMachineryController.updatePermanentMachinery
	);

export default router;
