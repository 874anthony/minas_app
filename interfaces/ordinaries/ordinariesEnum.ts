import * as ordinariesModels from '../../models/ordinaries/importAllOrdinaries';

export enum Gender {
	Men = 'Hombre',
	Woman = 'Mujer',
	Other = 'Otro',
}

export enum StatusOrdinary {
	Active = 'ACTIVO',
	InProcess = 'EN PROCESO',
	Pending = 'PENDIENTE',
	Inactive = 'INACTIVO',
	Rejected = 'RECHAZADO',
	Sanitation = 'SUBSANAR',
	Forbidden = 'PROHIBIDO',
	Visa = 'POR VISAR',
}

export const ModelsOrdinary = {
	permanentPerson: ordinariesModels.PermanentPersonModel,
	punctualworkPerson: ordinariesModels.PunctualWorkPerson,
	specialworkPerson: ordinariesModels.SpecialWorkPerson,
	visitorPerson: ordinariesModels.VisitorPerson,
	visitorVehicle: ordinariesModels.VisitorVehicle,
	permanentLightVehicle: ordinariesModels.PermanentLightVehicle,
	punctualLightVehicle: ordinariesModels.PunctualLightVehicle,
	permanentHeavyVehicle: ordinariesModels.PermanentHeavyVehicle,
	punctualHeavyVehicle: ordinariesModels.PunctualHeavyVehicle,
	specialpunctualHeavyVehicle: ordinariesModels.SpecialPunctualHeavyVehicle,
};
export interface StatusBody {
	id: string;
	checkAccessControl?: boolean;
	checkRSE?: boolean;
	checkSSFF?: boolean;
	checkSISO?: boolean;
	checkAuditing?: boolean;
	checkSMIN?: boolean;
	correctAccessControl?: boolean;
	correctRSE?: boolean;
	correctSSFF?: boolean;
	correctSISO?: boolean;
	correctSMIN?: boolean;
}
