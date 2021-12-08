// Importing own models
import PunctualLightVehicleModel from '../../../../models/ordinaries/vehicles/light/punctuallightVehicleModel';

import { UserRoles } from '../../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../../ordinaryFactory';

const uploadPunctualLightVehicles = ordinaryFactory.uploadVehicle;

// const getCitizenship =
// 	ordinaryFactory.getOrdinaryCitizenship(PunctualLightVehicleModel);

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

export {
	createPunctualLightVehicle,
	updatePunctualLightVehicle,
	// getCitizenship,
	uploadPunctualLightVehicles,
};
