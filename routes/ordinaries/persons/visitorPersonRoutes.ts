// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as visitorPersonController from '../../../controllers/ordinaries/persons/visitorPersonController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(
		visitorPersonController.uploadVisitorPersons,
		visitorPersonController.createVisitorPerson
	);

router
	.route('/:id')
	.put(
		visitorPersonController.getCitizenship,
		visitorPersonController.uploadVisitorPersons,
		visitorPersonController.updateVisitorPerson
	);

export default router;
