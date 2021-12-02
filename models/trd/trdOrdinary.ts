import { Schema, model } from 'mongoose';

export interface TrdOrdinaryI extends Schema {
	dependency: Schema.Types.ObjectId;
	consecutive: any;
	getConsecutive: () => any;
}

// Definying the schema
const TrdOrdinarySchema: Schema<TrdOrdinaryI> = new Schema({
	dependency: {
		type: Schema.Types.ObjectId,
		ref: 'trd_dependency',
		required: true,
	},
	consecutive: {
		type: Number,
		default: 0,
	},
});

TrdOrdinarySchema.methods.getConsecutive = function () {
	return this.consecutive;
};

export default model<TrdOrdinaryI>('trd_ordinaries', TrdOrdinarySchema);
