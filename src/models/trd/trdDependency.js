"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// JUST IN CASE
// interface TrdDependencyInterface extends Schema {
// 	dependencyCode: number;
// 	dependencyName: string;
// 	status: boolean;
// 	createdAt: any;
// 	updatedAt: any;
// 	getDependencyCode: () => number;
// }
var TrdDependency = new mongoose_1.Schema({
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
// JUST IN CASE
// TrdDependency.methods.getDependencyCode = function () {
// 	return this.dependencyCode;
// };
exports.default = (0, mongoose_1.model)('trd_dependency', TrdDependency);
