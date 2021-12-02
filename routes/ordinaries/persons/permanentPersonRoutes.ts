// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as permanentPersonController from '../../../controllers/ordinaries/persons/permanentPersonController';
import * as authController from '../../../controllers/auth/authController';
import * as workflowController from '../../../controllers/workflow/workflowController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(
		permanentPersonController.uploadPermanentPersons,
		permanentPersonController.createPermanentPerson
	)
	.get(
		authController.guardLogin,
		workflowController.checkRole,
		permanentPersonController.getAllPermanentPerson
	);

router
	.route('/workflow/permanent-person/:id')
	.patch(
		authController.guardLogin,
		permanentPersonController.changeStatusPermanent
	);

export default router;