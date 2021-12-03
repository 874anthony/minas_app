import express from 'express';

// Importing the controllers
import * as authController from '../../controllers/auth/authController';
import * as workflowController from '../../controllers/workflow/workflowController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(
		authController.guardLogin,
		workflowController.checkRole,
		workflowController.getAllOrdinariesType
	);

router.route('/:id').patch(
	authController.guardLogin
	// permanentPersonController.changeStatusPermanent
);

export default router;
