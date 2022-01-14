// Importing own models
import VisitorVehicleModel from '../../../../models/ordinaries/vehicles/light/visitorlightVehicleModel';
import CronJob from '../../../../utils/cronJob';
import { UserRoles } from '../../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../../ordinaryFactory';

const uploadVisitorVehicles = ordinaryFactory.uploadVehicle;

const getVehicleNumber = ordinaryFactory.getVehicleNumber(VisitorVehicleModel);

const createVisitorVehicle = ordinaryFactory.createOrdinary(
	VisitorVehicleModel,
	[UserRoles.AccessControl],
	{
		checkAccessControl: false,
	},
	{
		correctAccessControl: false,
	}
);

const updateVisitorVehicle =
	ordinaryFactory.updateOrdinary(VisitorVehicleModel);

// Cron Job to verify if Date.now() > qrCodeDate
const job = CronJob(VisitorVehicleModel);
job.start();

export {
	createVisitorVehicle,
	getVehicleNumber,
	uploadVisitorVehicles,
	updateVisitorVehicle,
};
