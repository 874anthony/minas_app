import { Schema, model } from 'mongoose';
import { getModelByType } from '../../../../interfaces/ordinaries/ordinariesEnum';
import uniquevalidator from 'mongoose-unique-validator';
import { autoDecline } from '../../../../utils/cronJob';
import { addDate } from '../../../../utils/date';
import Event from '../../../events/eventsModel';

// Definying the schema
const PermanentHeavyVehicleSchema = new Schema({
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
	// finishDates: Date,
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
		default: 'permanentHeavyVehicle',
	},
	serviceType: {
		type: String,
		required: true,
	},
	docPicture: String,
	docSoat: String,
	docPropertyCard: String,
	docTechno: String,
	docInspectionVehicle: String,
	docOperationCard: String,
	accessType: String,
	attached: [String],
	soatVigency: Date,
	technoVigency: Date,
	operationCardVigency: Date,
	observations: [String],
	qrCodeDate: Date,
	reasonDescription: String,
});

PermanentHeavyVehicleSchema.plugin(uniquevalidator, {
	message: 'El {PATH} proveído ya se encuentra registrado.',
});

PermanentHeavyVehicleSchema.pre('save', function (next) {
	if (this.isNew) {
		// const days = 3;
		// this.maxAuthorizationDate = addDate(this.recepcionDate, days);

		this.accessType = getModelByType[this.ordinaryType];
	}
	next();
});

PermanentHeavyVehicleSchema.pre('save', async function (next) {
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

PermanentHeavyVehicleSchema.post('save', autoDecline);

export default model('permanentheavy_vehicle', PermanentHeavyVehicleSchema);
