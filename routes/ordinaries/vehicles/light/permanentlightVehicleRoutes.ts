// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as permanentLightVehicleController from '../../../../controllers/ordinaries/vehicles/light/permanentlightVehicleController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(
		permanentLightVehicleController.uploadPermanentLightVehicles,
		permanentLightVehicleController.createPermanentLightVehicle
	);

router
	.route('/:id')
	.put(permanentLightVehicleController.updatePermanentLightVehicle);

export default router;
