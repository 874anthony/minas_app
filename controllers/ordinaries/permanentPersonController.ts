// Importing own models
import PermanentPerson from '../../models/ordinaries/permanentPersonModel';
import { UserRoles } from '../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../ordinaryFactory';

const uploadPermanentPersons = ordinaryFactory.uploadPermanentPerson;

const createPermanentPerson = ordinaryFactory.createOrdinayPerson(
	PermanentPerson,
	[UserRoles.AccessControl],
	{
		checkRSE: false,
		checkAccessControl: false,
		checkSSFF: false,
		checkSISO: false,
		checkAuditing: false,
		checkSMIN: false,
	}
);

export { createPermanentPerson, uploadPermanentPersons };
