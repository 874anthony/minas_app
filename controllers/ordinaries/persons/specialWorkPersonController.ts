// Importing own models
import SpecialWorkPersonModel from '../../../models/ordinaries/persons/specialWorkPersonModel';
import CronJob from '../../../utils/cronJob';
import { UserRoles } from '../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../ordinaryFactory';

const uploadSpecialWorkPersons = ordinaryFactory.uploadPerson;

const getCitizenship = ordinaryFactory.getOrdinaryCitizenship(
	SpecialWorkPersonModel
);

const createSpecialWorkPerson = ordinaryFactory.createOrdinary(
	SpecialWorkPersonModel,
	[UserRoles.AccessControl, UserRoles.SST, UserRoles.Auditing],
	{
		checkAccessControl: false,
		checkSST: false,
		checkAuditing: false,
	},
	{
		correctAccessControl: false,
		correctSST: false,
		correctAuditing: false,
	}
);

const updateSpecialWorkPerson = ordinaryFactory.updateOrdinary(
	SpecialWorkPersonModel
);

// Cron Job to verify if Date.now() > qrCodeDate
CronJob(SpecialWorkPersonModel).start();

export {
	createSpecialWorkPerson,
	uploadSpecialWorkPersons,
	getCitizenship,
	updateSpecialWorkPerson,
};
