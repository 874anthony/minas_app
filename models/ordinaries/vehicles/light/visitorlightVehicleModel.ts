import { Schema, model } from 'mongoose';

// Definying the schema
const VisitorlightVehicleSchema = new Schema({
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
	},
	ordinaryType: {
		type: String,
		default: 'visitorVehicle',
	},
	serviceType: {
		type: String,
		required: true,
	},
	soatVigency: Date,
	docSoat: String,
	technoVigency: Date,
	operationCardVigency: Date,
});

export default model('visitor_vehicle', VisitorlightVehicleSchema);
