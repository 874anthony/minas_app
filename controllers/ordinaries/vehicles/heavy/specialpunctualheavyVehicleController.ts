// Importing own models
import SpecialPunctualHeavyVehicleModel from '../../../../models/ordinaries/vehicles/heavy/specialpunctualheavyVehicleModel';

import { UserRoles } from '../../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../../ordinaryFactory';

const uploadSpecialPunctualHeavyVehicles = ordinaryFactory.uploadVehicle;

// const getCitizenship =
// 	ordinaryFactory.getOrdinaryCitizenship(SpecialPunctualHeavyVehicleModel);

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

export {
	createSpecialPunctualHeavyVehicle,
	updateSpecialPunctualHeavyVehicle,
	// getCitizenship,
	uploadSpecialPunctualHeavyVehicles,
};