// Importing own models
import PermanentHeavyVehicleModel from '../../../../models/ordinaries/vehicles/heavy/permanentheavyVehicleModel';

import { UserRoles } from '../../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../../ordinaryFactory';

const uploadPermanentHeavyVehicles = ordinaryFactory.uploadVehicle;

const getVehicleNumber = ordinaryFactory.getVehicleNumber(
	PermanentHeavyVehicleModel
);

const createPermanentHeavyVehicle = ordinaryFactory.createOrdinary(
	PermanentHeavyVehicleModel,
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

const updatePermanentHeavyVehicle = ordinaryFactory.updateOrdinary(
	PermanentHeavyVehicleModel
);

export {
	createPermanentHeavyVehicle,
	updatePermanentHeavyVehicle,
	getVehicleNumber,
	uploadPermanentHeavyVehicles,
};
