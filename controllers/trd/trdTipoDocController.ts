// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';
// Importing our models
import TRDTipoDoc from '../../models/trd/trdTipoDoc';

// Importing the factory
import { createOne, findAll, findOne, updateOne } from '../handlerFactory';

const getTipoDocBySerieDepSubs = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.query.dependencyID = req.params.idDependency;
	req.query.serieID = req.params.idSerie;
	req.query.subSerieID = req.params.idsubserie;
	next();
};

const createTipoDoc = createOne(TRDTipoDoc);
const getAllTipoDocs = findAll(TRDTipoDoc);
const getTipoDoc = findOne(TRDTipoDoc);
const updateTipoDoc = updateOne(TRDTipoDoc);

export {
	createTipoDoc,
	getAllTipoDocs,
	getTipoDoc,
	updateTipoDoc,
	getTipoDocBySerieDepSubs,
};
