import * as ordinariesModels from '../../models/ordinaries/importAllOrdinaries';

export enum Gender {
	Men = 'Hombre',
	Woman = 'Mujer',
	Other = 'Otro',
}

export enum StatusOrdinary {
	Active = 'ACTIVO',
	Finished = 'FINALIZADO',
	Pending = 'PENDIENTE',
	Inactive = 'INACTIVO',
	Rejected = 'RECHAZADO',
	Sanitation = 'SUBSANAR',
	// Forbidden = 'PROHIBIDO',
	Visa = 'POR VISAR',
}

export const getModelByType = {
	permanentPerson: 'Persona Permanente',
	punctualworkPerson: 'Persona Trabajo Puntual',
	specialworkPerson: 'Persona Especial',
	visitorPerson: 'Persona Visitante',
	visitorVehicle: 'Vehiculo Visitante',
	permanentLightVehicle: 'Vehiculo Liviano Permanente',
	punctualLightVehicle: 'Vehiculo Liviano Puntual',
	permanentHeavyVehicle: 'Vehiculo Pesado Permanente',
	punctualHeavyVehicle: 'Vehiculo Pesado Puntual',
	specialpunctualHeavyVehicle: ' Vehiculo Especial Pesado',
};

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

export const PersonsOrdinary = {
	permanentPerson: ordinariesModels.PermanentPersonModel,
	punctualworkPerson: ordinariesModels.PunctualWorkPerson,
	specialworkPerson: ordinariesModels.SpecialWorkPerson,
	visitorPerson: ordinariesModels.VisitorPerson,
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
