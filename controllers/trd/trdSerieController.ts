// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';
// Importing our models
import TRDSerie from '../../models/trd/trdSerie';

// Importing the factory
import { createOne, findAll, findOne, updateOne } from '../handlerFactory';

const getSeriesByDependency = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.query.dependencyID = req.params.idDependency;
	next();
};

const createSerie = createOne(TRDSerie);
const getAllSeries = findAll(TRDSerie);
const getSerie = findOne(TRDSerie);
const updateSerie = updateOne(TRDSerie);

export {
	createSerie,
	getAllSeries,
	getSerie,
	updateSerie,
	getSeriesByDependency,
};
