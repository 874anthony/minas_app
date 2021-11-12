import { Schema, model } from 'mongoose';

export interface TrdInterface extends Schema {
	dependency: Schema.Types.ObjectId;
	serie: Schema.Types.ObjectId;
	subserie: Schema.Types.ObjectId;
	consecutive: any;
	getConsecutive: () => any;
}
// interface TrdModel extends Model<TrdInterface> {
// 	getConsecutive(): number;
// }

// Definying the schema
const TrdSchema: Schema<TrdInterface> = new Schema({
	dependency: {
		type: Schema.Types.ObjectId,
		ref: 'trd_dependency',
		required: true,
		min: 4,
	},
	serie: {
		type: Schema.Types.ObjectId,
		ref: 'trd_serie',
		required: true,
		min: 2,
	},
	subserie: {
		type: Schema.Types.ObjectId,
		ref: 'trd_subserie',
		required: true,
		min: 2,
	},
	consecutive: {
		type: Number,
		default: 0,
	},
});

TrdSchema.methods.getConsecutive = function () {
	return this.consecutive;
};

export default model<TrdInterface>('trd', TrdSchema);
