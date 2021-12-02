// Importing own models
import PunctualWorkPersonModel from '../../../models/ordinaries/persons/punctualWorkPersonModel';

import { UserRoles } from '../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../ordinaryFactory';

const uploadPunctualWorkPersons = ordinaryFactory.uploadPunctualWorkPerson;

const createPunctualWorkPerson = ordinaryFactory.createOrdinay(
	PunctualWorkPersonModel,
	[UserRoles.AccessControl],
	{
		checkAccessControl: false,
	},
	{
		correctAccessControl: false,
	}
);

const changeStatusPunctualWork = ordinaryFactory.changeStatusOrdinary();

const getAllPunctualPerson = ordinaryFactory.getAllOrdinariesType(
	PunctualWorkPersonModel
);

export {
	createPunctualWorkPerson,
	uploadPunctualWorkPersons,
	changeStatusPunctualWork,
	getAllPunctualPerson,
};
