// Importing own models
import VisitorVehicleModel from '../../../../models/ordinaries/vehicles/light/visitorlightVehicleModel';

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

export {
	createVisitorVehicle,
	getVehicleNumber,
	uploadVisitorVehicles,
	updateVisitorVehicle,
};
