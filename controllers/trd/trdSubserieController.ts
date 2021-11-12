import { NextFunction, Request, Response } from 'express';

// Importing the global handler error and the catchAsync
import HttpException from '../../utils/httpException';
import catchAsync from '../../utils/catchAsync';

// Importing our models
import TRDSubSerie from '../../models/trd/trdSubSerie';

// Importing the Dto Objects
import DtoCreateSubSerie from '../../interfaces/trd/subseries/post-createSubserie';

const createSubSerie = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const dependencyID = req.params.id;
		const serieID = req.params.idSerie;

		const body: DtoCreateSubSerie = req.body;

		if (!body || !dependencyID || !serieID) {
			return next(
				new HttpException(
					'Hacen faltan campos para la creación de la serie',
					404
				)
			);
		}

		const newSubSerie = await TRDSubSerie.create({
			dependencyID,
			serieID,
			subSerieCode: body.subSerieCode,
			subSerieName: body.subSerieName,
		});

		if (!newSubSerie) {
			return next(
				new HttpException(
					'No se pudo crear la serie, inténtelo nuevamente',
					400
				)
			);
		}

		return res.status(201).json({
			status: true,
			message: `Se creó exitosamente la serie - ${body.subSerieName}`,
			serie: newSubSerie,
		});
	}
);

export { createSubSerie };
