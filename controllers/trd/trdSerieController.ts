import { NextFunction, Request, Response } from 'express';

// Importing the global handler error and the catchAsync
import HttpException from '../../utils/httpException';
import catchAsync from '../../utils/catchAsync';

// Importing our models
import TRDSerie from '../../models/trd/trdSerie';

// Importing the Dto Objects
import DtoCreateSerie from '../../interfaces/trd/series/post-createSerie';

const createSerie = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const dependencyID = req.params.id;
		const body: DtoCreateSerie = req.body;

		if (!body || !dependencyID) {
			return next(
				new HttpException(
					'Hacen faltan campos para la creación de la serie',
					404
				)
			);
		}

		const newSerie = await TRDSerie.create({
			dependencyID,
			serieCode: body.serieCode,
			serieName: body.serieName,
		});

		if (!newSerie) {
			return next(
				new HttpException(
					'No se pudo crear la serie, inténtelo nuevamente',
					400
				)
			);
		}

		return res.status(201).json({
			status: true,
			message: `Se creó exitosamente la serie - ${body.serieName}`,
			serie: newSerie,
		});
	}
);

export { createSerie };
