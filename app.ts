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
import ordinariesRouter from './routes/ordinaries/ordinariesRoutes';
import userRouter from './routes/users/userRoutes';

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

// Defining the static files
app.use(
	'/pdf-companies',
	express.static(path.join(__dirname, '../store/documents/company'))
);

app.use(
	'/pdf-contractors',
	express.static(path.join(__dirname, '../store/documents/contractors'))
);

// Importing routes
app.use('/api/v1/companies', companyRouter);
app.use('/api/v1/contractors', contractorRouter);
app.use('/api/v1/trd-management', trdRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/ordinaries-person', ordinariesRouter);
app.use('/api/v1/user', userRouter);

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
