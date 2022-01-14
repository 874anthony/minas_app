import express from 'express';

// Imports required (controllers)
import * as trdDependencyController from '../../controllers/trd/trdDependencyController';
import * as trdSerieController from '../../controllers/trd/trdSerieController';
import * as trdSubSerieController from '../../controllers/trd/trdSubserieController';
import * as trdTipoDocController from '../../controllers/trd/trdTipoDocController';

const router = express.Router();

// DEPENDENCY ROUTES
router
	.route('/dependency')
	.post(trdDependencyController.createDependency)
	.get(trdDependencyController.getAllDependencies);

router
	.route('/dependency/:id')
	.get(trdDependencyController.getDependency)
	.put(trdDependencyController.updateDependency);

// SERIES ROUTES
router
	.route('/serie')
	.post(trdSerieController.createSerie)
	.get(trdSerieController.getAllSeries);

router
	.route('/dependency/:idDependency/serie/:id')
	.get(trdSerieController.getSerie)
	.put(trdSerieController.updateSerie);

// SUBSERIES ROUTES
router
	.route('/subserie')
	.post(trdSubSerieController.createSubSerie)
	.get(trdSubSerieController.getAllSubseries);

router
	.route('/dependency/:idDependency/serie/:idSerie/subserie/:id')
	.get(trdSubSerieController.getSubserie)
	.put(trdSubSerieController.updateSubserie);

// DOCUMENT ROUTES
router
	.route('/tipodoc')
	.post(trdTipoDocController.createTipoDoc)
	.get(trdTipoDocController.getAllTipoDocs);

router
	.route(
		'/dependency/:idDependency/serie/:idserie/subserie/:idsubserie/tipodoc/:id'
	)
	.get(trdTipoDocController.getTipoDoc)
	.put(trdTipoDocController.updateTipoDoc);

export default router;
