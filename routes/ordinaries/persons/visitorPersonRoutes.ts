// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as visitorPersonController from '../../../controllers/ordinaries/persons/visitorPersonController';
// import * as authController from '../../../controllers/auth/authController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(
		visitorPersonController.uploadVisitorPersons,
		visitorPersonController.createVisitorPerson
	);

export default router;
