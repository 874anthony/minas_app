// Importing own models
import PunctualWorkPersonModel from '../../../models/ordinaries/persons/punctualWorkPersonModel';
import CronJob from '../../../utils/cronJob';
import { UserRoles } from '../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../ordinaryFactory';

const uploadPunctualWorkPersons = ordinaryFactory.uploadPerson;

const getCitizenship = ordinaryFactory.getOrdinaryCitizenship(
	PunctualWorkPersonModel
);

const createPunctualWorkPerson = ordinaryFactory.createOrdinary(
	PunctualWorkPersonModel,
	[UserRoles.AccessControl],
	{
		checkAccessControl: false,
	},
	{
		correctAccessControl: false,
	}
);

const updatePunctualWorkPerson = ordinaryFactory.updateOrdinary(
	PunctualWorkPersonModel
);

// Cron Job to verify if Date.now() > qrCodeDate
const job = CronJob(PunctualWorkPersonModel);
job.start();

export {
	createPunctualWorkPerson,
	uploadPunctualWorkPersons,
	getCitizenship,
	updatePunctualWorkPerson,
};
