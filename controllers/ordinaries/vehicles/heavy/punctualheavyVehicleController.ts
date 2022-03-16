// Importing own models
import PunctualHeavyVehicleModel from '../../../../models/ordinaries/vehicles/heavy/punctualheavyVehicleModel';
import CronJob from '../../../../utils/cronJob';
import { UserRoles } from '../../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../../ordinaryFactory';

const uploadPunctualHeavyVehicles = ordinaryFactory.uploadVehicle;

const getVehicleNumber = ordinaryFactory.getVehicleNumber(
	PunctualHeavyVehicleModel
);

const createPunctualHeavyVehicle = ordinaryFactory.createOrdinary(
	PunctualHeavyVehicleModel,
	[
		UserRoles.AccessControl,
	],
	{
		checkAccessControl: false,
	},
	{
		correctAccessControl: false,
	}
);

const updatePunctualHeavyVehicle = ordinaryFactory.updateOrdinary(
	PunctualHeavyVehicleModel
);

// Cron Job to verify if Date.now() > qrCodeDate
const job = CronJob(PunctualHeavyVehicleModel);
job.start();

export {
	createPunctualHeavyVehicle,
	updatePunctualHeavyVehicle,
	getVehicleNumber,
	uploadPunctualHeavyVehicles,
};
