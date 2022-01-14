import { Schema, model } from 'mongoose';

// JUST IN CASE
// interface TrdDependencyInterface extends Schema {
// 	dependencyCode: number;
// 	dependencyName: string;
// 	status: boolean;
// 	createdAt: any;
// 	updatedAt: any;
// 	getDependencyCode: () => number;
// }

const TrdDependency = new Schema({
	dependencyCode: {
		type: Number,
		required: true,
		min: 4,
		unique: true,
	},
	dependencyName: {
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

// JUST IN CASE
// TrdDependency.methods.getDependencyCode = function () {
// 	return this.dependencyCode;
// };

export default model('trd_dependency', TrdDependency);
