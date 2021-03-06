import HttpException from '../utils/httpException';

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new HttpException(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
	const value = err.message.match(/(["'])(\\?.)*?\1/)[0];

	const message = `Duplicate field value: ${value}. Please use another value!`;
	return new HttpException(message, 400);
};

const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el: any) => el.message);

	const message = `Invalid input data: ${errors.join('. ')}`;
	return new HttpException(message, 400);
};

const handleJWTError = () =>
	new HttpException('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
	new HttpException('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err, req, res) => {
	// A) API
	if (req.originalUrl.startsWith('/api')) {
		return res.status(err.status).json({
			status: err.status,
			error: err,
			message: err.message,
			stack: err.stack,
		});
	}
};

const sendErrorProd = (err, req, res) => {
	// A) API
	if (req.originalUrl.startsWith('/api')) {
		// A) Operational, trusted error: send message to client
		if (err.isOperational) {
			return res.status(err.status).json({
				status: err.status,
				message: err.message,
			});
		}
		// B) Programming or other unknown error: don't leak error details
		// 1) Log error
		console.error('ERROR 💥', err);
		// 2) Send generic message
		return res.status(500).json({
			status: 'error',
			message: 'Something went very wrong!',
		});
	}
};

export default (err, req, res, next) => {
	// console.log(err.stack);
	// err.statusCode = err.statusCode || 500;

	err.status = err.status || 500;

	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(err, req, res);
	} else if (process.env.NODE_ENV === 'production') {
		let error = { ...err };
		error.message = err.message;

		if (error.kind === 'ObjectId') error = handleCastErrorDB(error);
		if (error.code === 11000) error = handleDuplicateFieldsDB(error);
		if (error.errors) error = handleValidationErrorDB(error);
		if (error.name === 'JsonWebTokenError') error = handleJWTError();
		if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

		sendErrorProd(error, req, res);
	}
};
