// Importing own models
import PunctualLightVehicleModel from '../../../../models/ordinaries/vehicles/light/punctuallightVehicleModel';
import CronJob from '../../../../utils/cronJob';
import { UserRoles } from '../../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../../ordinaryFactory';

const uploadPunctualLightVehicles = ordinaryFactory.uploadVehicle;

const getVehicleNumber = ordinaryFactory.getVehicleNumber(
	PunctualLightVehicleModel
);

const createPunctualLightVehicle = ordinaryFactory.createOrdinary(
	PunctualLightVehicleModel,
	[UserRoles.AccessControl],
	{
		checkAccessControl: false,
	},
	{
		correctAccessControl: false,
	}
);

const updatePunctualLightVehicle = ordinaryFactory.updateOrdinary(
	PunctualLightVehicleModel
);

// Cron Job to verify if Date.now() > qrCodeDate
const job = CronJob(PunctualLightVehicleModel);
job.start();

export {
	createPunctualLightVehicle,
	updatePunctualLightVehicle,
	getVehicleNumber,
	uploadPunctualLightVehicles,
};
