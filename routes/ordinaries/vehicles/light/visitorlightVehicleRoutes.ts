// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as visitorVehicleController from '../../../../controllers/ordinaries/vehicles/light/visitorlightVehicleController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(
		visitorVehicleController.uploadVisitorVehicles,
		visitorVehicleController.createVisitorVehicle
	);

router
	.route('/:id')
	.put(
		visitorVehicleController.getVehicleNumber,
		visitorVehicleController.uploadVisitorVehicles,
		visitorVehicleController.updateVisitorVehicle
	);

export default router;
