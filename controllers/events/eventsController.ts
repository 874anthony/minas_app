// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';

import Event from '../../models/events/eventsModel';
import APIFeatures from '../../utils/apiFeatures';
import catchAsync from '../../utils/catchAsync';
import HttpException from '../../utils/httpException';

const getEventsByOrdinary = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.query.radicado = req.params.idradicado;
	next();
};

const getAllEvents = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		let features = new APIFeatures(Event.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const events = await features.query.populate([
			{
				path: 'radicado',
				select: '-__v',
			},
		]);

		if (events.length === 0) {
			return next(
				new HttpException(
					'No hay documentos con ese criterio de búsqueda!',
					204
				)
			);
		}

		return res.status(200).json({
			status: true,
			events,
		});
	}
);

export { getEventsByOrdinary, getAllEvents };
