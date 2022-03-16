// Importing own models
import PermanentMachinery from '../../../models/ordinaries/machinery/permanentMachineryModel';
import CronJob from '../../../utils/cronJob';
import { UserRoles } from '../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../ordinaryFactory';

const uploadPermanentMachinery = ordinaryFactory.uploadVehicle;

const getVehicleNumber = ordinaryFactory.getVehicleNumber(PermanentMachinery);

// validar si es permanentes en general o permanentes especiales.
const createPermanentMachinery = ordinaryFactory.createOrdinary(
	PermanentMachinery,
	[
		UserRoles.AccessControl,
		UserRoles.SST,
		UserRoles.Auditing
	],
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
