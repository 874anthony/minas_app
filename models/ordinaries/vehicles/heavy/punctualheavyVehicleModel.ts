import { Schema, model } from 'mongoose';

// Definying the schema
const PunctualHeavyVehicleSchema = new Schema({
	radicado: {
		type: String,
		default: 'Sin radicado',
	},
	status: {
		type: String,
		default: 'PENDIENTE',
	},
	companyID: {
		type: Schema.Types.ObjectId,
		ref: 'company',
	},
	contractorID: {
		type: Schema.Types.ObjectId,
		ref: 'contractor',
		required: false,
	},
	startDates: [Date],
	finishDates: [Date],
	type: {
		type: String,
		required: true,
	},
	vehicleType: {
		type: String,
		required: true,
	},
	vehicleNumber: {
		type: String,
		required: true,
		unique: true,
	},
	ordinaryType: {
		type: String,
		default: 'punctualHeavyVehicle',
	},
	serviceType: {
		type: String,
		required: true,
	},
	soatVigency: Date,
	docSoat: String,
	docPropertyCard: String,
	docTechno: String,
	docInspectionVehicle: String,
	docMachineCard: String,
	docBill: String,
	docAduana: String,
	docOperationCard: String,
	docSISCONMP: String,
	docVehicleListCheck: String,
	docTeamCert: String,
	docQualityCert: String,
	technoVigency: Date,
	operationCardVigency: Date,
});

export default model('punctualheavy_vehicle', PunctualHeavyVehicleSchema);
