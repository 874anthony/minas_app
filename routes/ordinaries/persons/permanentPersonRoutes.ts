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

router
	.route('/:id')
	.put(
		permanentPersonController.getCitizenship,
		permanentPersonController.uploadPermanentPersons,
		permanentPersonController.updatePermanentPerson
	);

export default router;
