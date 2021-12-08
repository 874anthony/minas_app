// Importing own models
import PermanentLightVehicleModel from '../../../../models/ordinaries/vehicles/light/permanentlightVehicleModel';

import { UserRoles } from '../../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../../ordinaryFactory';

const uploadPermanentLightVehicles = ordinaryFactory.uploadVehicle;

// const getCitizenship =
// 	ordinaryFactory.getOrdinaryCitizenship(PermanentLightVehicleModel);

const createPermanentLightVehicle = ordinaryFactory.createOrdinary(
	PermanentLightVehicleModel,
	[UserRoles.AccessControl, UserRoles.SISO, UserRoles.Auditing],
	{
		checkAccessControl: false,
		checkSISO: false,
		checkAuditing: false,
	},
	{
		correctAccessControl: false,
		correctSISO: false,
		correcAuditing: false,
	}
);

const updatePermanentLightVehicle = ordinaryFactory.updateOrdinary(
	PermanentLightVehicleModel
);

export {
	createPermanentLightVehicle,
	updatePermanentLightVehicle,
	// getCitizenship,
	uploadPermanentLightVehicles,
};
