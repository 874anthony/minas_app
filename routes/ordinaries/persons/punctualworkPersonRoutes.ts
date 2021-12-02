// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as punctualworkPersonController from '../../../controllers/ordinaries/persons/punctualWorkPersonController';
import * as authController from '../../../controllers/auth/authController';
import * as workflowController from '../../../controllers/workflow/workflowController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(
		punctualworkPersonController.uploadPunctualWorkPersons,
		punctualworkPersonController.createPunctualWorkPerson
	)
	.get(
		authController.guardLogin,
		workflowController.checkRole,
		punctualworkPersonController.getAllPunctualPerson
	);

router
	.route('/workflow/punctual-work-person/:id')
	.patch(
		authController.guardLogin,
		punctualworkPersonController.changeStatusPunctualWork
	);

export default router;
