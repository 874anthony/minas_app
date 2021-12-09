// Importing own models
import SpecialPunctualHeavyVehicleModel from '../../../../models/ordinaries/vehicles/heavy/specialpunctualheavyVehicleModel';
import CronJob from '../../../../utils/cronJob';
import { UserRoles } from '../../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../../ordinaryFactory';

const uploadSpecialPunctualHeavyVehicles = ordinaryFactory.uploadVehicle;

const getVehicleNumber = ordinaryFactory.getVehicleNumber(
	SpecialPunctualHeavyVehicleModel
);

const createSpecialPunctualHeavyVehicle = ordinaryFactory.createOrdinary(
	SpecialPunctualHeavyVehicleModel,
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

const updateSpecialPunctualHeavyVehicle = ordinaryFactory.updateOrdinary(
	SpecialPunctualHeavyVehicleModel
);

// Cron Job to verify if Date.now() > qrCodeDate
const job = CronJob(SpecialPunctualHeavyVehicleModel);
job.start();

export {
	createSpecialPunctualHeavyVehicle,
	updateSpecialPunctualHeavyVehicle,
	getVehicleNumber,
	uploadSpecialPunctualHeavyVehicles,
};
