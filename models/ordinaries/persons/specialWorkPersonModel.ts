import { Schema, model } from 'mongoose';
import { addDate } from '../../../utils/date';
import Event from '../../events/eventsModel';

// Definying the schema
const SpecialWorkPersonSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
	},
	appointment: {
		type: String,
		required: true,
		minlength: 4,
	},
	citizenship: {
		type: Number,
		unique: true,
		required: true,
		min: 7,
	},
	gender: {
		type: String,
		required: true,
		enum: {
			values: ['Hombre', 'Mujer', 'Otro'],
			message: 'El sexo debe ser alguno de los listados',
		},
	},
	birthplace: {
		type: String,
		required: true,
		minlength: 4,
	},
	residentPlace: {
		type: String,
		minlength: 4,
	},
	licenseCategory: {
		type: String,
		trim: true,
	},
	docHealth: String,
	docPension: String,
	docARL: String,
	docCitizenship: String,
	docSocialSecurity: String,
	docMedicalFitness: String,
	docCV: String,
	docDrivingLicense: String,
	docPsycho: String,
	docDefDrivingLicense: String,
	docDrivingTest: String,
	docCraneOperator: String,
	docSafeworkHeights: String,
	docCompetenceCert: String,
	docSISCONMP: String,
	radicado: {
		type: String,
		default: 'Sin radicado',
	},
	observations: [String],
	medicalConceptDate: Date,

	inductionDate: Date,
	inductionVigency: Date,
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
	status: {
		type: String,
		default: 'PENDIENTE',
	},
	attached: [String],
	recepcionDate: {
		type: Date,
		default: Date.now(),
	},
	maxAuthorizationDate: Date,
	qrCodeDate: Date,
	reasonDescription: String,
	ordinaryType: {
		type: String,
		default: 'specialworkPerson',
	},
	licenseVigency: Date,
	accessType: String,
	updatedAt: {
		type: Date,
	},
});

SpecialWorkPersonSchema.pre('save', function (next) {
	if (this.isNew) {
		const days = 3;
		this.maxAuthorizationDate = addDate(this.recepcionDate, days);
	}
	next();
});

SpecialWorkPersonSchema.pre('save', async function (next) {
	if (this.isModified('status') && this.status === 'ACTIVO') {
		const bodyEvent = {
			radicado: this._id,
			action: 'Actualización Registro',
			description: 'Se aprobó el ingreso y se ha generado un código QR',
		};

		await Event.create(bodyEvent);

		const qrCodeDays = 3;
		this.qrCodeDate = addDate(Date.now(), qrCodeDays);
	}
	next();
});

export default model('specialwork_person', SpecialWorkPersonSchema);
