import { Schema, model } from 'mongoose';

// Definying the schema
const PunctualWorkPersonSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
	},
	citizenship: {
		type: Number,
		unique: true,
		required: true,
		min: 7,
	},
	appointment: {
		type: String,
		required: true,
		minlength: 4,
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
	licenseCategory: {
		type: String,
		required: true,
		maxlength: [3, 'La categoría solo puede tener 3 letras como máximo'],
		trim: true,
	},
	docCovid19: {
		type: String,
	},
	docHealth: {
		type: String,
	},
	docPension: {
		type: String,
	},
	docSocialSecurity: {
		type: String,
	},
	docCitizenship: {
		type: String,
	},
	radicado: {
		type: String,
		default: 'Sin radicado',
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
	status: {
		type: String,
		default: 'PENDIENTE',
	},
	observations: [String],
	attached: [String],
	ordinaryType: {
		type: String,
		default: 'punctualworkPerson',
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	updatedAt: {
		type: Date,
	},
});

export default model('punctualwork_person', PunctualWorkPersonSchema);
