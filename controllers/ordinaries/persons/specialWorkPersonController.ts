// Importing own models
import SpecialWorkPersonModel from '../../../models/ordinaries/persons/specialWorkPersonModel';

import { UserRoles } from '../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../ordinaryFactory';

const uploadSpecialWorkPersons = ordinaryFactory.uploadPerson;

const getCitizenship = ordinaryFactory.getOrdinaryCitizenship(
	SpecialWorkPersonModel
);

const createSpecialWorkPerson = ordinaryFactory.createOrdinary(
	SpecialWorkPersonModel,
	[UserRoles.AccessControl, UserRoles.SISO, UserRoles.Auditing],
	{
		checkAccessControl: false,
		checkSISO: false,
		checkAuditing: false,
	},
	{
		correctAccessControl: false,
		correctSISO: false,
		correctAuditing: false,
	}
);

const updateSpecialWorkPerson = ordinaryFactory.updateOrdinary(
	SpecialWorkPersonModel
);

export {
	createSpecialWorkPerson,
	uploadSpecialWorkPersons,
	getCitizenship,
	updateSpecialWorkPerson,
};
