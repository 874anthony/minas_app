import { Schema, model } from 'mongoose';
import { addDate } from '../../../utils/date';

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
	docCV: String,
	docDrivingLicense: String,
	docPsycho: String,
	docDefDrivingLicense: String,
	docDrivingTest: String,
	docCraneOperator: String,
	docSafeworkHeights: String,
	docRigger: String,
	radicado: {
		type: String,
		default: 'Sin radicado',
	},
	observations: [String],
	medicalConceptDate: Date,

	inductionDate: Date,
	inductionValidity: Boolean,
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
	ordinaryType: {
		type: String,
		default: 'specialworkPerson',
	},
	licenseValidity: Boolean,
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

export default model('specialwork_person', SpecialWorkPersonSchema);
