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
	Visa = 'POR VISAR',
}

export const getModelByType = {
	permanentPerson: 'Persona permanente',
	punctualworkPerson: 'Persona trabajo puntual',
	specialworkPerson: 'Persona especial',
	visitorPerson: 'Persona visitante',
	visitorVehicle: 'Vehiculo visitante',
	permanentLightVehicle: 'Vehiculo liviano permanente',
	punctualLightVehicle: 'Vehiculo liviano puntual',
	permanentHeavyVehicle: 'Vehiculo pesado permanente',
	punctualHeavyVehicle: 'Vehiculo pesado puntual',
	specialpunctualHeavyVehicle: ' Vehiculo especial pesado',
};

export const ModelsOrdinary = {
	// Personas
	visitorPerson: ordinariesModels.VisitorPerson,
	permanentPerson: ordinariesModels.PermanentPersonModel,
	punctualworkPerson: ordinariesModels.PunctualWorkPerson,
	specialworkPerson: ordinariesModels.SpecialWorkPerson,
	// Vehiculos
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

export const VehiclesOrdinary = {
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
