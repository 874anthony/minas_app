import { Schema, model } from 'mongoose';
import { addDate } from '../../../../utils/date';
import uniqueValidator from 'mongoose-unique-validator';
import { getModelByType } from '../../../../interfaces/ordinaries/ordinariesEnum';
import Event from '../../../events/eventsModel';
import { autoDecline } from '../../../../utils/cronJob';

// Definying the schema
const SpecialPunctualHeavyVehicleSchema = new Schema({
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
		default: 'specialHeavyVehicle',
	},
	serviceType: {
		type: String,
		required: true,
	},
	docPicture: String,
	docSoat: String,
	docPropertyCard: String,
	docTechno: String,
	docOperationCard: String,
	docInspectionVehicle: String,
	accessType: String,
	attached: [String],
	soatVigency: Date,
	technoVigency: Date,
	operationCardVigency: Date,
	observations: [String],
	qrCodeDate: Date,
	reasonDescription: String,
});

SpecialPunctualHeavyVehicleSchema.plugin(uniqueValidator, {
	message: 'El {PATH} proveído ya se encuentra registrado.',
});

// SpecialPunctualHeavyVehicleSchema.pre('save', function (next) {
// if (this.isNew) {
// // const days = 3;
// // this.maxAuthorizationDate = addDate(this.recepcionDate, days);
// }
// next();
// });

SpecialPunctualHeavyVehicleSchema.pre('save', async function (next) {
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

SpecialPunctualHeavyVehicleSchema.post('save', autoDecline);

export default model('specialheavy_vehicle', SpecialPunctualHeavyVehicleSchema);
