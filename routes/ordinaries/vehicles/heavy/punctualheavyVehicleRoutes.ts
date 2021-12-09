// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as punctualHeavyVehicleController from '../../../../controllers/ordinaries/vehicles/heavy/punctualheavyVehicleController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(
		punctualHeavyVehicleController.uploadPunctualHeavyVehicles,
		punctualHeavyVehicleController.createPunctualHeavyVehicle
	);

router
	.route('/:id')
	.put(
		punctualHeavyVehicleController.getVehicleNumber,
		punctualHeavyVehicleController.uploadPunctualHeavyVehicles,
		punctualHeavyVehicleController.updatePunctualHeavyVehicle
	);

export default router;
