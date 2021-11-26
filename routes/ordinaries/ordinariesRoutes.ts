// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as permanentPersonController from '../../controllers/ordinaries/permanentPersonController';
import * as authController from '../../controllers/auth/authController';
import * as workflowController from '../../controllers/workflow/workflowController';

const router = express.Router({ mergeParams: true });

router
	.route('/permanent-person')
	.post(
		permanentPersonController.uploadPermanentPersons,
		permanentPersonController.createPermanentPerson
	)
	.get(
		authController.guardLogin,
		workflowController.checkRole,
		workflowController.getAllPermanents
	);

router
	.route('/permanent-person/:id')
	.patch(permanentPersonController.changeStatusPermanent);

export default router;
