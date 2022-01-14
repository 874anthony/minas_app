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

// Cron Job to verify if Date.now() > qrCodeDate
const job = CronJob(SpecialWorkPersonModel);
job.start();

export {
	createSpecialWorkPerson,
	uploadSpecialWorkPersons,
	getCitizenship,
	updateSpecialWorkPerson,
};
