import { Schema, model } from 'mongoose';

const TrdTipoDoc = new Schema({
	dependencyID: {
		type: Schema.Types.ObjectId,
		ref: 'trd_dependency',
		required: true,
	},
	serieID: {
		type: Schema.Types.ObjectId,
		ref: 'trd_serie',
		required: true,
	},
	subSerieID: {
		type: Schema.Types.ObjectId,
		ref: 'trd_subserie',
		required: true,
	},
	tipoDocCode: {
		type: Number,
		required: true,
		min: 2,
		unique: true,
	},
	tipoDocName: {
		type: String,
		required: true,
		minlength: 5,
	},
	status: {
		type: Boolean,
		default: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	updatedAt: {
		type: Date,
	},
});

export default model('trd_tipodoc', TrdTipoDoc);
