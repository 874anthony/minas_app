// Importing 3rd-party packages
import express from 'express';

// Importing the controllers
import * as permanentPersonController from '../../../controllers/ordinaries/persons/permanentPersonController';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(
		permanentPersonController.uploadPermanentPersons,
		permanentPersonController.createPermanentPerson
	);

export default router;
