// Importing own models
import PermanentHeavyVehicleModel from '../../../../models/ordinaries/vehicles/heavy/permanentheavyVehicleModel';
import CronJob from '../../../../utils/cronJob';
import { UserRoles } from '../../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../../ordinaryFactory';

const uploadPermanentHeavyVehicles = ordinaryFactory.uploadVehicle;

const getVehicleNumber = ordinaryFactory.getVehicleNumber(
	PermanentHeavyVehicleModel
);

// validar si es permanentes en general o permanentes especiales.
const createPermanentHeavyVehicle = ordinaryFactory.createOrdinary(
	PermanentHeavyVehicleModel,
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
		correcAuditing: false,
	}
);

const updatePermanentHeavyVehicle = ordinaryFactory.updateOrdinary(
	PermanentHeavyVehicleModel
);

// Cron Job to verify if Date.now() > qrCodeDate
const job = CronJob(PermanentHeavyVehicleModel);
job.start();

export {
	createPermanentHeavyVehicle,
	updatePermanentHeavyVehicle,
	getVehicleNumber,
	uploadPermanentHeavyVehicles,
};
