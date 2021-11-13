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
	},
	serie: {
		type: Schema.Types.ObjectId,
		ref: 'trd_serie',
		required: true,
	},
	subserie: {
		type: Schema.Types.ObjectId,
		ref: 'trd_subserie',
		required: true,
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
