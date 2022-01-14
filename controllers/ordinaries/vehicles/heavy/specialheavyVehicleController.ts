// Importing own models
import SpecialHeavyVehicleModel from '../../../../models/ordinaries/vehicles/heavy/specialheavyVehicleModel';
import CronJob from '../../../../utils/cronJob';
import { UserRoles } from '../../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../../ordinaryFactory';

const uploadSpecialHeavyVehicles = ordinaryFactory.uploadVehicle;

const getVehicleNumber = ordinaryFactory.getVehicleNumber(
	SpecialHeavyVehicleModel
);

const createSpecialHeavyVehicle = ordinaryFactory.createOrdinary(
	SpecialHeavyVehicleModel,
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

const updateSpecialHeavyVehicle = ordinaryFactory.updateOrdinary(
	SpecialHeavyVehicleModel
);

// Cron Job to verify if Date.now() > qrCodeDate
const job = CronJob(SpecialHeavyVehicleModel);
job.start();

export {
	createSpecialHeavyVehicle,
	updateSpecialHeavyVehicle,
	getVehicleNumber,
	uploadSpecialHeavyVehicles,
};
