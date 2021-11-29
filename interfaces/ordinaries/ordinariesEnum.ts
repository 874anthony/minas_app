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
	Correct = 'SUBSANAR',
	Forbidden = 'PROHIBIDO',
}

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
