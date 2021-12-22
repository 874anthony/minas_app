import { Schema, model } from 'mongoose';
import { addDate } from '../../../../utils/date';
import Event from '../../../events/eventsModel';

// Definying the schema
const PunctualLightVehicleSchema = new Schema({
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
	startDates: Date,
	finishDates: Date,
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
		default: 'punctualLightVehicle',
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
	qrCodeDate: Date,
	observations: [String],
});

PunctualLightVehicleSchema.pre('save', async function (next) {
	if (this.isModified('status') && this.status === 'ACTIVO') {
		const bodyEvent = {
			radicado: this._id,
			action: 'Actualización Registro',
			description: 'Se aprobó el ingreso y se ha generado un código QR',
		};

		await Event.create(bodyEvent);

		const qrCodeDays = 2;
		this.qrCodeDate = addDate(Date.now(), qrCodeDays);
	}
	next();
});

export default model('punctuallight_vehicle', PunctualLightVehicleSchema);
