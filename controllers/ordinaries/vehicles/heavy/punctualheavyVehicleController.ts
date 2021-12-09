// Importing own models
import PunctualHeavyVehicleModel from '../../../../models/ordinaries/vehicles/heavy/punctualheavyVehicleModel';

import { UserRoles } from '../../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../../ordinaryFactory';

const uploadPunctualHeavyVehicles = ordinaryFactory.uploadVehicle;

const getVehicleNumber = ordinaryFactory.getVehicleNumber(
	PunctualHeavyVehicleModel
);

const createPunctualHeavyVehicle = ordinaryFactory.createOrdinary(
	PunctualHeavyVehicleModel,
	[UserRoles.AccessControl],
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

export {
	createPunctualHeavyVehicle,
	updatePunctualHeavyVehicle,
	getVehicleNumber,
	uploadPunctualHeavyVehicles,
};
