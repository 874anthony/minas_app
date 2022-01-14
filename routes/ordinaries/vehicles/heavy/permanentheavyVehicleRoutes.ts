// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as permanentHeavyVehicleController from '../../../../controllers/ordinaries/vehicles/heavy/permanentheavyVehicleController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(
		permanentHeavyVehicleController.uploadPermanentHeavyVehicles,
		permanentHeavyVehicleController.createPermanentHeavyVehicle
	);

router
	.route('/:id')
	.put(
		permanentHeavyVehicleController.getVehicleNumber,
		permanentHeavyVehicleController.uploadPermanentHeavyVehicles,
		permanentHeavyVehicleController.updatePermanentHeavyVehicle
	);

export default router;
