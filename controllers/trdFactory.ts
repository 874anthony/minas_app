import { NextFunction, Request, Response } from 'express';

// Importing the global handler error and the catchAsync
import HttpException from '../utils/httpException';
import catchAsync from '../utils/catchAsync';

const createOneTRD = (Model) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const body = req.body;

		if (!body) {
			return next(
				new HttpException('Hacen faltan campos para la creación de la TRD', 404)
			);
		}

		const newTRD = await Model.create(body);

		if (!newTRD) {
			return next(
				new HttpException('No se pudo crear la TRD, inténtelo nuevamente', 400)
			);
		}

		return res.status(201).json({
			status: true,
			message: `Se aplicó exitosamente la TRD`,
			trd: newTRD,
		});
	});

export { createOneTRD };
