import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

// TODO: Own Imports LATER BE REMOVED
import HttpException from './utils/httpException';

// Own routes
import companyRouter from './routes/company/companyRoutes';
import contractorRouter from './routes/contractors/contractorRoutes';
import trdRouter from './routes/trd/trdRoutes';
import authRouter from './routes/auth/authRoutes';
import userRouter from './routes/users/userRoutes';
import workflowRouter from './routes/ordinaries/workflowRoutes';
import eventRouter from './routes/events/eventsRoutes';
import ordinaryRouter from './routes/ordinaries/ordinariesRoutes';
import permanentPersonRouter from './routes/ordinaries/persons/permanentPersonRoutes';
import punctualworkPersonRouter from './routes/ordinaries/persons/punctualworkPersonRoutes';
import visitorPersonRouter from './routes/ordinaries/persons/visitorPersonRoutes';
import specialworkPersonRouter from './routes/ordinaries/persons/specialworkPersonRoutes';
import visitorVehicleRouter from './routes/ordinaries/vehicles/light/visitorlightVehicleRoutes';
import permanentLightVehicleRouter from './routes/ordinaries/vehicles/light/permanentlightVehicleRoutes';
import permanentHeavyVehicleRouter from './routes/ordinaries/vehicles/heavy/permanentheavyVehicleRoutes';
import punctualLightVehicleRouter from './routes/ordinaries/vehicles/light/punctuallightVehicleRoutes';
import punctualHeavyVehicleRouter from './routes/ordinaries/vehicles/heavy/punctualheavyVehicleRoutes';
import specialpunctualHeavyVehicleRouter from './routes/ordinaries/vehicles/heavy/specialpunctualheavyVehicleRoutes';

const app = express();

// To handle the CORS
app.use(cors());
//  To recognize the incoming Request Object as a JSON Object.
app.use(express.json({ limit: '50mb' }));
//  To recognize the incoming Request Object as strings or arrays.
app.use(express.urlencoded({ extended: true }));

// Getting the logs.
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

console.log(__dirname);

// Defining the static files
app.use(
	'/pdf-companies',
	express.static(path.join(__dirname, '/store/documents/company'))
);

app.use(
	'/pdf-contractors',
	express.static(path.join(__dirname, '/store/documents/contractors'))
);

app.use(
	'/pdf-ordinaries',
	express.static(path.join(__dirname, '/store/documents/ordinaries'))
);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// Importing routes
app.use('/api/v1/companies', companyRouter);
app.use('/api/v1/contractors', contractorRouter);
app.use('/api/v1/trd-management', trdRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/workflow', workflowRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/ordinaries', ordinaryRouter);
app.use('/api/v1/ordinaries-person/permanent-person', permanentPersonRouter);
app.use(
	'/api/v1/ordinaries-person/punctual-work-person',
	punctualworkPersonRouter
);
app.use('/api/v1/ordinaries-person/visitor-person', visitorPersonRouter);
app.use(
	'/api/v1/ordinaries-person/special-work-person',
	specialworkPersonRouter
);
// Vehicle starts here
app.use('/api/v1/ordinaries-vehicle/visitor-vehicle', visitorVehicleRouter);
app.use(
	'/api/v1/ordinaries-vehicle/permanent-light-vehicle',
	permanentLightVehicleRouter
);
app.use(
	'/api/v1/ordinaries-vehicle/permanent-heavy-vehicle',
	permanentHeavyVehicleRouter
);
app.use(
	'/api/v1/ordinaries-vehicle/punctual-light-vehicle',
	punctualLightVehicleRouter
);
app.use(
	'/api/v1/ordinaries-vehicle/punctual-heavy-vehicle',
	punctualHeavyVehicleRouter
);
app.use(
	'/api/v1/ordinaries-vehicle/special-punctual-heavy-vehicle',
	specialpunctualHeavyVehicleRouter
);

// Define the global error handler to pass next errors
function globalErrorHandler(
	err: HttpException,
	req: Request,
	res: Response,
	next: NextFunction
) {
	const status = err.status || 500;
	const message = err.message || 'Something went wrong';

	return res.status(status).json({
		error: err,
		status,
		message,
		stack: err.stack,
	});
}

// Using the the global error handler
app.use(globalErrorHandler);

export default app;
