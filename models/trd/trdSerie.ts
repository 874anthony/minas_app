import { Schema, model } from 'mongoose';

const TrdSerie = new Schema({
	dependencyID: {
		type: Schema.Types.ObjectId,
		ref: 'trd_dependency',
		required: true,
	},
	serieCode: {
		type: Number,
		required: true,
		min: 2,
		unique: true,
	},
	serieName: {
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

export default model('trd_serie', TrdSerie);
