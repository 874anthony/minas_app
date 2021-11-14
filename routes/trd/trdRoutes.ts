import express from 'express';

// Imports required (controllers)
import * as trdDependencyController from '../../controllers/trd/trdDependencyController';
import * as trdSerieController from '../../controllers/trd/trdSerieController';
import * as trdSubSerieController from '../../controllers/trd/trdSubserieController';
import * as trdTipoDocController from '../../controllers/trd/trdTipoDocController';

const router = express.Router();

// DEPENDENCY ROUTES
router.route('/dependency').post(trdDependencyController.createDependency);

// SERIES ROUTES
router.route('/dependency/:id/serie').post(trdSerieController.createSerie);

// SUBSERIES ROUTES
router
	.route('/dependency/:id/serie/:idSerie/subserie')
	.post(trdSubSerieController.createSubSerie);

// DOCUMENT ROUTES
router
	.route('/dependency/:id/serie/:idserie/subserie/:idsubserie/tipodoc')
	.post(trdTipoDocController.createTipoDoc);

export default router;
