// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as punctualMachineryController from '../../../controllers/ordinaries/machinery/punctualMachineryController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(
		punctualMachineryController.uploadPunctualMachinery,
		punctualMachineryController.createPunctualMachinery
	);

router
	.route('/:id')
	.put(
		punctualMachineryController.getVehicleNumber,
		punctualMachineryController.uploadPunctualMachinery,
		punctualMachineryController.updatePunctualMachinery
	);

export default router;
