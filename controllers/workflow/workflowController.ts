// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';

// Importing our utils to this controller
import HttpException from '../../utils/httpException';
import catchAsync from '../../utils/catchAsync';
import APIFeatures from '../../utils/apiFeatures';

// Importing own models
import PermanentPerson from '../../models/ordinaries/persons/permanentPersonModel';
import * as ordinaryFactory from '../ordinaryFactory';

const checkRole = (req: Request, res: Response, next: NextFunction) => {
	const userID = req['user']._id;
	req.query.roles = userID;
	next();
};

const getAllPermanents = ordinaryFactory.getAllOrdinariesType(PermanentPerson);

export { getAllPermanents, checkRole };
