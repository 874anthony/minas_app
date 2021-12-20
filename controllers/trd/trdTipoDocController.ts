// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';
// Importing our models
import TRDTipoDoc from '../../models/trd/trdTipoDoc';

// Importing the global handler error and the catchAsync
import HttpException from '../../utils/httpException';
import catchAsync from '../../utils/catchAsync';
import APIFeatures from '../../utils/apiFeatures';

// Importing the factory
import { createOne, findOne, updateOne } from '../handlerFactory';

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

const getAllTipoDocs = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		let features = new APIFeatures(TRDTipoDoc.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const tipodocs = await features.query.populate([
			{
				path: 'dependencyID',
				select: 'dependencyCode dependencyName status',
			},
			{
				path: 'serieID',
				select: 'serieCode serieName status',
			},
			{
				path: 'subSerieID',
				select: 'subSerieCode subSerieName status',
			},
		]);

		if (tipodocs.length === 0) {
			return next(
				new HttpException(
					'No hay documentos con ese criterio de búsqueda!',
					204
				)
			);
		}

		return res.status(200).json({
			status: true,
			tipodocs,
		});
	}
);

const getTipoDoc = findOne(TRDTipoDoc);
const updateTipoDoc = updateOne(TRDTipoDoc);

export {
	createTipoDoc,
	getAllTipoDocs,
	getTipoDoc,
	updateTipoDoc,
	getTipoDocBySerieDepSubs,
};
