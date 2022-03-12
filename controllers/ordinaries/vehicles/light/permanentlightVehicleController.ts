// Importing own models
import PermanentLightVehicleModel from '../../../../models/ordinaries/vehicles/light/permanentlightVehicleModel';
import CronJob from '../../../../utils/cronJob';
import { UserRoles } from '../../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../../ordinaryFactory';

const uploadPermanentLightVehicles = ordinaryFactory.uploadVehicle;

const getVehicleNumber = ordinaryFactory.getVehicleNumber(
	PermanentLightVehicleModel
);

// validar si es permanentes en general o permanentes especiales.
const createPermanentLightVehicle = ordinaryFactory.createOrdinary(
	PermanentLightVehicleModel,
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

const updatePermanentLightVehicle = ordinaryFactory.updateOrdinary(
	PermanentLightVehicleModel
);

// Cron Job to verify if Date.now() > qrCodeDate
CronJob(PermanentLightVehicleModel).start();

export {
	createPermanentLightVehicle,
	updatePermanentLightVehicle,
	uploadPermanentLightVehicles,
	getVehicleNumber,
};
