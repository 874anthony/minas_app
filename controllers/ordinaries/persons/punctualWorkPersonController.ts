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
		checkRSE: false,
		checkSSFF: false,
		checkSISO: false,
		checkAuditing: false,
		checkSMIN: false,
	},
	{
		correctAccessControl: false,
		correctRSE: false,
		correctSISO: false,
		correctAuditing: false,
		correctSMIN: false,
	}
);

const changeStatusPunctualWork = ordinaryFactory.changeStatusOrdinary();

export {
	createPunctualWorkPerson,
	uploadPunctualWorkPersons,
	changeStatusPunctualWork,
};
