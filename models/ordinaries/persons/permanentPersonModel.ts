import { Schema, model } from 'mongoose';
import { StatusOrdinary } from '../../../interfaces/ordinaries/ordinariesEnum';
import { addDate } from '../../../utils/date';

// Definying the schema
const PermanentPersonSchema = new Schema({
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
		required: true,
		maxlength: [3, 'La categoría solo puede tener 3 letras como máximo'],
		trim: true,
	},
	docHealth: {
		type: String,
	},
	docPension: String,
	docARL: String,
	docCitizenship: {
		type: String,
	},
	docSocialSecurity: String,
	docMedicalFitness: String,
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
	startDates: [Date],
	finishDates: [Date],
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
	ordinaryType: {
		type: String,
		default: 'permanentPerson',
	},
	licenseVigency: Date,
	updatedAt: {
		type: Date,
	},
});

PermanentPersonSchema.pre('save', function (next) {
	if (this.isNew) {
		const days = 3;
		this.maxAuthorizationDate = addDate(this.recepcionDate, days);
	}
	next();
});

PermanentPersonSchema.pre('save', function (next) {
	if (this.isModified('status') && this.status === 'ACTIVO') {
		const qrCodeDays = 3;
		this.qrCodeDate = addDate(Date.now(), qrCodeDays);
	}
	next();
});

export default model('permanent_person', PermanentPersonSchema);
