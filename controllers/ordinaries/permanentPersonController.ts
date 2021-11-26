// Importing 3rd-party packages
import { Request, Response, NextFunction } from 'express';

// Importing our utils to this controller
import catchAsync from '../../utils/catchAsync';
import HttpException from '../../utils/httpException';

// Importing own models
import PermanentPerson from '../../models/ordinaries/permanentPersonModel';
import Workflow from '../../models/workflows/workflowModel';
import { UserRoles } from '../../models/users/userModel';

// Importing the factory
import { StatusBody } from '../../interfaces/ordinaries/ordinariesEnum';
import * as ordinaryFactory from '../ordinaryFactory';

const uploadPermanentPersons = ordinaryFactory.uploadPermanentPerson;

const createPermanentPerson = ordinaryFactory.createOrdinay(
	PermanentPerson,
	[UserRoles.AccessControl],
	{
		checkRSE: false,
		checkAccessControl: false,
		checkSSFF: false,
		checkSISO: false,
		checkAuditing: false,
		checkSMIN: false,
	},
	{
		correctRSE: false,
		correctAccessControl: false,
	}
);

const changeStatusPermanent = ordinaryFactory.changeStatusOrdinary();

export { createPermanentPerson, uploadPermanentPersons, changeStatusPermanent };
