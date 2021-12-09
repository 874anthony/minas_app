import express from 'express';

import * as ordinaryFactory from '../../controllers/ordinaryFactory';

const router = express.Router({ mergeParams: true });

// Aliases routes
router
	.route('/ordinaries-by-company')
	.get(ordinaryFactory.checkCompanyID, ordinaryFactory.getAllOrds);

router.route('/inactivate-all').put(ordinaryFactory.inactiveOrdsByCompany);

router.route('/').get(ordinaryFactory.getAllOrds);

router.route('/:id').get(ordinaryFactory.getOrdById);

export default router;
