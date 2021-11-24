// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';

// Importing our utils to this controller
import HttpException from '../../utils/httpException';
import catchAsync from '../../utils/catchAsync';
import APIFeatures from '../../utils/apiFeatures';

// Importing own models
// import PermanentPerson from '../../models/ordinaries/permanentPersonModel';
import Workflow from '../../models/workflows/workflowModel';

const checkRole = (req: Request, res: Response, next: NextFunction) => {
	const userID = req['user']._id;
	req.query.roles = userID;
	next();
};

const getAllOrdinaries = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const features = new APIFeatures(Workflow.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const permanents = await features.query;

		if (permanents.length === 0) {
			return next(new HttpException('No hay permanentes pendientes!', 204));
		}

		res.status(200).json({
			status: true,
			data: {
				permanents,
			},
		});
	}
);

export { getAllOrdinaries, checkRole };
