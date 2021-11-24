// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as permanentPersonController from '../../controllers/ordinaries/permanentPersonController';
import * as authController from '../../controllers/auth/authController';
import * as workflowController from '../../controllers/workflow/workflowController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(
		authController.guardLogin,
		workflowController.checkRole,
		workflowController.getAllOrdinaries
	);

router
	.route('/permanent-person')
	.post(
		permanentPersonController.uploadPermanentPersons,
		permanentPersonController.createPermanentPerson
	);
export default router;
