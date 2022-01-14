// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';
// Importing our models
import TRDSubSerie from '../../models/trd/trdSubSerie';

// Importing the factory
import { createOne, findOne, updateOne } from '../handlerFactory';

// Importing the global handler error and the catchAsync
import HttpException from '../../utils/httpException';
import catchAsync from '../../utils/catchAsync';
import APIFeatures from '../../utils/apiFeatures';

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

const getAllSubseries = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		let features = new APIFeatures(TRDSubSerie.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const subseries = await features.query.populate([
			{
				path: 'dependencyID',
				select: 'dependencyCode dependencyName status',
			},
			{
				path: 'serieID',
				select: 'serieCode serieName status',
			},
		]);

		if (subseries.length === 0) {
			return next(
				new HttpException(
					'No hay documentos con ese criterio de búsqueda!',
					204
				)
			);
		}

		return res.status(200).json({
			status: true,
			subseries,
		});
	}
);

const getSubserie = findOne(TRDSubSerie);
const updateSubserie = updateOne(TRDSubSerie);

export {
	createSubSerie,
	getAllSubseries,
	getSubserie,
	updateSubserie,
	getSubseriesBySerieDep,
};
