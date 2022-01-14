// Importing own models
import PermanentMachinery from '../../../models/ordinaries/machinery/permanentMachineryModel';
import CronJob from '../../../utils/cronJob';
import { UserRoles } from '../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../ordinaryFactory';

const uploadPermanentMachinery = ordinaryFactory.uploadVehicle;

const getVehicleNumber = ordinaryFactory.getVehicleNumber(PermanentMachinery);

const createPermanentMachinery = ordinaryFactory.createOrdinary(
	PermanentMachinery,
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

const updatePermanentMachinery =
	ordinaryFactory.updateOrdinary(PermanentMachinery);

// Cron Job to verify if Date.now() > qrCodeDate
const job = CronJob(PermanentMachinery);
job.start();

export {
	createPermanentMachinery,
	uploadPermanentMachinery,
	getVehicleNumber,
	updatePermanentMachinery,
};
