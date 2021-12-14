// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';

import Event from '../../models/events/eventsModel';
import * as factory from '../handlerFactory';

const getEventsByOrdinary = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.query.radicado = req.params.idradicado;
	next();
};

const getAllEvents = factory.findAll(Event);

export { getEventsByOrdinary, getAllEvents };
