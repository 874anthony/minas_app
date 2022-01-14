// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';
// Importing our models
import TRDSerie from '../../models/trd/trdSerie';

// Importing the global handler error and the catchAsync
import HttpException from '../../utils/httpException';
import catchAsync from '../../utils/catchAsync';
import APIFeatures from '../../utils/apiFeatures';

// Importing the factory
import { createOne, findOne, updateOne } from '../handlerFactory';

const getSeriesByDependency = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.query.dependencyID = req.params.idDependency;
	next();
};

const createSerie = createOne(TRDSerie);

const getAllSeries = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		let features = new APIFeatures(TRDSerie.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const series = await features.query.populate([
			{
				path: 'dependencyID',
				select: 'dependencyCode dependencyName status',
			},
		]);

		if (series.length === 0) {
			return next(
				new HttpException(
					'No hay documentos con ese criterio de búsqueda!',
					204
				)
			);
		}

		return res.status(200).json({
			status: true,
			series,
		});
	}
);

const getSerie = findOne(TRDSerie);
const updateSerie = updateOne(TRDSerie);

export {
	createSerie,
	getAllSeries,
	getSerie,
	updateSerie,
	getSeriesByDependency,
};
