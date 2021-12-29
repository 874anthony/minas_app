import { Schema, model } from 'mongoose';
import { addDate } from '../../../utils/date';
import { getModelByType } from '../../../interfaces/ordinaries/ordinariesEnum';
import Event from '../../events/eventsModel';

// Definying the schema
const PermanentMachinerySchema = new Schema({
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
	vehicleNumber: {
		type: String,
		required: true,
		unique: true,
	},
	reasonDescription: String,
	ordinaryType: {
		type: String,
		default: 'permanentMachinery',
	},
	docInspectionVehicle: String,
	docMachineCard: String,
	docBill: String,
	docAduana: String,
	observations: [String],
	qrCodeDate: Date,
	accessType: String,
});

PermanentMachinerySchema.pre('save', function (next) {
	if (this.isNew) {
		// const days = 3;
		// this.maxAuthorizationDate = addDate(this.recepcionDate, days);

		this.accessType = getModelByType[this.ordinaryType];
	}
	next();
});

PermanentMachinerySchema.pre('save', async function (next) {
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

export default model('permanent_machinery', PermanentMachinerySchema);
