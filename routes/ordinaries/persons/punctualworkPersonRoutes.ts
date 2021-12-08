// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as punctualworkPersonController from '../../../controllers/ordinaries/persons/punctualWorkPersonController';
// import * as authController from '../../../controllers/auth/authController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(
		punctualworkPersonController.uploadPunctualWorkPersons,
		punctualworkPersonController.createPunctualWorkPerson
	);

router
	.route('/:id')
	.put(
		punctualworkPersonController.getCitizenship,
		punctualworkPersonController.uploadPunctualWorkPersons,
		punctualworkPersonController.updatePunctualWorkPerson
	);

export default router;
