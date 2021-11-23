// Importing 3rd-party packages
import express from 'express';

import * as permanentPersonController from '../../controllers/ordinaries/permanentPersonController';

const router = express.Router({ mergeParams: true });

router
	.route('/create-permanent-person')
	.post(
		permanentPersonController.uploadPermanentPersons,
		permanentPersonController.createPermanentPerson
	);

export default router;
