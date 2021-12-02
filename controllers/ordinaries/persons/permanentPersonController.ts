// Importing own models
import PermanentPerson from '../../../models/ordinaries/persons/permanentPersonModel';

import { UserRoles } from '../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../ordinaryFactory';

const uploadPermanentPersons = ordinaryFactory.uploadPermanentPerson;

const createPermanentPerson = ordinaryFactory.createOrdinay(
	PermanentPerson,
	[
		UserRoles.AccessControl,
		UserRoles.Auditing,
		UserRoles.RSE,
		UserRoles.SISO,
		UserRoles.SMIN,
		UserRoles.SSFF,
	],
	{
		checkAccessControl: false,
		checkAuditing: false,
		checkRSE: false,
		checkSISO: false,
		checkSMIN: false,
		checkSSFF: false,
	},
	{
		correctAccessControl: false,
		correctAuditing: false,
		correctRSE: false,
		correctSISO: false,
		correctSMIN: false,
	}
);

const changeStatusPermanent = ordinaryFactory.changeStatusOrdinary();

export { createPermanentPerson, uploadPermanentPersons, changeStatusPermanent };
