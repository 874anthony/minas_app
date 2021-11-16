import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

// TODO: Own Imports LATER BE REMOVED
import HttpException from './utils/httpException';

// Own routes
import companyRouter from './routes/company/companyRoutes';
import contractorRouter from './routes/contractors/contractorRoutes';
import trdRouter from './routes/trd/trdRoutes';

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

// Importing routes
app.use('/api/v1/companies', companyRouter);
app.use('/api/v1/contractors', contractorRouter);
app.use('/api/v1/trd-management', trdRouter);

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
		status: err.status,
		message: err.message,
		stack: err.stack,
	});
}

// Using the the global error handler
app.use(globalErrorHandler);

export default app;
