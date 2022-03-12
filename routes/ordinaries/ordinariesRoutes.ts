import express, { Response } from 'express';
import {
	activeOrdsByContractor,
	inactiveOrdsByContractor,
} from '../../controllers/contractor/contractorController';

import * as ordinaryFactory from '../../controllers/ordinaryFactory';

const router = express.Router({ mergeParams: true });

// Aliases routes
router
	.route('/ordinaries-by-company')
	.get(ordinaryFactory.checkCompanyID, ordinaryFactory.getAllOrds);
router
	.route('/ordinaries-by-contractor/:idContractor')
	.get(ordinaryFactory.checkContractorID, ordinaryFactory.getAllOrds);

router.route('/inactivate-all').put(ordinaryFactory.inactiveOrdsByCompany);
router.route('/activate-all').put(ordinaryFactory.activeOrdsByCompany);

router.route('/inactivate-all-contractors').put(inactiveOrdsByContractor);
router.route('/activate-all-contractors').put(activeOrdsByContractor);

router.route('/generate-report-persons').get(ordinaryFactory.exportExcelPerson);
router
	.route('/generate-report-vehicles')
	.get(ordinaryFactory.exportExcelVehicle);

router.route('/').get(ordinaryFactory.getAllOrds);

router.route('/:id').get(ordinaryFactory.getOrdById);

router.post('/:id/extension', (req: any, res: any) => {
	return res.send('Extension');
});

export default router;
