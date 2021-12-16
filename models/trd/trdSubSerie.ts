import { Schema, model } from 'mongoose';

const TrdSubserie = new Schema({
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
	subSerieCode: {
		type: Number,
		required: true,
		min: 2,
		unique: true,
	},
	subSerieName: {
		type: String,
		required: true,
		minlength: 5,
	},
	status: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	updatedAt: {
		type: Date,
	},
});

export default model('trd_subserie', TrdSubserie);
