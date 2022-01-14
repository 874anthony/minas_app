// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as specialHeavyVehicleController from '../../../../controllers/ordinaries/vehicles/heavy/specialheavyVehicleController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(
		specialHeavyVehicleController.uploadSpecialHeavyVehicles,
		specialHeavyVehicleController.createSpecialHeavyVehicle
	);

router
	.route('/:id')
	.put(
		specialHeavyVehicleController.getVehicleNumber,
		specialHeavyVehicleController.uploadSpecialHeavyVehicles,
		specialHeavyVehicleController.updateSpecialHeavyVehicle
	);

export default router;
