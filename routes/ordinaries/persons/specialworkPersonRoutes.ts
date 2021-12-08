// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as specialworkPersonController from '../../../controllers/ordinaries/persons/specialWorkPersonController';
// import * as authController from '../../../controllers/auth/authController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(
		specialworkPersonController.uploadSpecialWorkPersons,
		specialworkPersonController.createSpecialWorkPerson
	);

router
	.route('/:id')
	.put(
		specialworkPersonController.getCitizenship,
		specialworkPersonController.uploadSpecialWorkPersons,
		specialworkPersonController.updateSpecialWorkPerson
	);

export default router;
