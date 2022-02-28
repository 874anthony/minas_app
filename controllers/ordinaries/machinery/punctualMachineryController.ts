// Importing own models
import PunctualMachinery from '../../../models/ordinaries/machinery/punctualMachineryModel';
import CronJob from '../../../utils/cronJob';
import { UserRoles } from '../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../ordinaryFactory';

const uploadPunctualMachinery = ordinaryFactory.uploadVehicle;

const getVehicleNumber = ordinaryFactory.getVehicleNumber(PunctualMachinery);

const createPunctualMachinery = ordinaryFactory.createOrdinary(
	PunctualMachinery,
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

const updatePunctualMachinery =
	ordinaryFactory.updateOrdinary(PunctualMachinery);

// Cron Job to verify if Date.now() > qrCodeDate
const job = CronJob(PunctualMachinery);
job.start();

export {
	createPunctualMachinery,
	uploadPunctualMachinery,
	getVehicleNumber,
	updatePunctualMachinery,
};
