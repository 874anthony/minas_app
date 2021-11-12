class HttpException extends Error {
	public status: number;
	public message: string;
	public isOperational: boolean;

	constructor(message: string, status: number) {
		super(message);

		this.status = status;
		this.message = message;
		this.isOperational = true;

		// To capture the stack race (the logs)
		Error.captureStackTrace(this, this.constructor);
	}
}

export default HttpException;
