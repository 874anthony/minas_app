// Importing own models
import PermanentPerson from '../../../models/ordinaries/persons/permanentPersonModel';
import CronJob from '../../../utils/cronJob';
import { UserRoles } from '../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../ordinaryFactory';

const uploadPermanentPersons = ordinaryFactory.uploadPerson;

const getCitizenship = ordinaryFactory.getOrdinaryCitizenship(PermanentPerson);

const createPermanentPerson = ordinaryFactory.createOrdinary(
	PermanentPerson,
	[
		UserRoles.AccessControl,
		UserRoles.Auditing,
		UserRoles.RSE,
		UserRoles.SST,
		UserRoles.SMIN,
		UserRoles.SSFF,
	],
	{
		checkAccessControl: false,
		checkAuditing: false,
		checkRSE: false,
		checkSST: false,
		checkSMIN: false,
		checkSSFF: false,
	},
	{
		correctAccessControl: false,
		correctAuditing: false,
		correctRSE: false,
		correctSST: false,
		correctSMIN: false,
	}
);

const updatePermanentPerson = ordinaryFactory.updateOrdinary(PermanentPerson);

// Cron Job to verify if Date.now() > qrCodeDate
const job = CronJob(PermanentPerson);
job.start();

export {
	createPermanentPerson,
	uploadPermanentPersons,
	getCitizenship,
	updatePermanentPerson,
};
