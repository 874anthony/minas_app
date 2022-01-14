import express from 'express';

// Importing the controllers
import * as authController from '../../controllers/auth/authController';
import * as workflowController from '../../controllers/workflow/workflowController';

const router = express.Router({ mergeParams: true });

router
	.route('/get-all-admin')
	.get(authController.guardLogin, workflowController.getWorkflosAdmin);

router
	.route('/')
	.get(
		authController.guardLogin,
		workflowController.checkRole,
		workflowController.getAllOrdinariesType
	);

router
	.route('/:id')
	.get(workflowController.getOneWorkflow)
	.patch(authController.guardLogin, workflowController.changeStatusOrdinary);

export default router;
