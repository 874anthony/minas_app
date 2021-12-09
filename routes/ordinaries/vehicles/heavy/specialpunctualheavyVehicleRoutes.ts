// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as specialpunctualHeavyVehicleController from '../../../../controllers/ordinaries/vehicles/heavy/specialpunctualheavyVehicleController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(
		specialpunctualHeavyVehicleController.uploadSpecialPunctualHeavyVehicles,
		specialpunctualHeavyVehicleController.createSpecialPunctualHeavyVehicle
	);

router
	.route('/:id')
	.put(
		specialpunctualHeavyVehicleController.getVehicleNumber,
		specialpunctualHeavyVehicleController.uploadSpecialPunctualHeavyVehicles,
		specialpunctualHeavyVehicleController.updateSpecialPunctualHeavyVehicle
	);

export default router;
