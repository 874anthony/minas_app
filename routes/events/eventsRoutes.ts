import express from 'express';

// Importing the controllers
import * as eventsController from '../../controllers/events/eventsController';

const router = express.Router({ mergeParams: true });

router.route('/').get(eventsController.getAllEvents);

router
	.route('/:idradicado')
	.get(eventsController.getEventsByOrdinary, eventsController.getAllEvents);

export default router;
