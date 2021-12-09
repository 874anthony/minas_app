// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as punctualLightVehicleController from '../../../../controllers/ordinaries/vehicles/light/punctuallightVehicleController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(
		punctualLightVehicleController.uploadPunctualLightVehicles,
		punctualLightVehicleController.createPunctualLightVehicle
	);

router
	.route('/:id')
	.put(
		punctualLightVehicleController.getVehicleNumber,
		punctualLightVehicleController.uploadPunctualLightVehicles,
		punctualLightVehicleController.updatePunctualLightVehicle
	);

export default router;
