// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';
import { ModelsOrdinary } from '../../interfaces/ordinaries/ordinariesEnum';

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
		const eventsPopulated = Object.values(ModelsOrdinary).map(async (Model) => {
			let populateQuery = new APIFeatures(Event.find(), req.query)
				.filter()
				.limitFields()
				.sort()
				.paginate();

			let eventResult = await populateQuery.query.populate({
				path: 'radicado',
				select: '-__v',
				model: Model,
			});

			return eventResult;
		});

		const events = await Promise.all(eventsPopulated);

		return res.status(200).json({
			status: true,
			events,
		});
	}
);

export { getEventsByOrdinary, getAllEvents };
