// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';
// Importing our models
import TRDSubSerie from '../../models/trd/trdSubSerie';

// Importing the factory
import { createOne, findAll, findOne, updateOne } from '../handlerFactory';

const getSubseriesBySerieDep = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.query.dependencyID = req.params.idDependency;
	req.query.serieID = req.params.idSerie;
	next();
};

const createSubSerie = createOne(TRDSubSerie);
const getAllSubseries = findAll(TRDSubSerie);
const getSubserie = findOne(TRDSubSerie);
const updateSubserie = updateOne(TRDSubSerie);

export {
	createSubSerie,
	getAllSubseries,
	getSubserie,
	updateSubserie,
	getSubseriesBySerieDep,
};
