// Importing own models
import VisitorPersonModel from '../../../models/ordinaries/persons/visitorPersonModel';

import { UserRoles } from '../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../ordinaryFactory';

const uploadVisitorPersons = ordinaryFactory.uploadPerson;

const getCitizenship =
	ordinaryFactory.getOrdinaryCitizenship(VisitorPersonModel);

const createVisitorPerson = ordinaryFactory.createOrdinary(
	VisitorPersonModel,
	[UserRoles.AccessControl],
	{
		checkAccessControl: false,
	},
	{
		correctAccessControl: false,
	}
);

const updateVisitorPerson = ordinaryFactory.updateOrdinary(VisitorPersonModel);

export {
	createVisitorPerson,
	getCitizenship,
	uploadVisitorPersons,
	updateVisitorPerson,
};
