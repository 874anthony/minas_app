"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// interface TrdModel extends Model<TrdInterface> {
// 	getConsecutive(): number;
// }
// Definying the schema
var TrdSchema = new mongoose_1.Schema({
    dependency: {
        type: Number,
        required: true,
        min: 3,
    },
    serie: {
        type: Number,
        required: true,
        min: 2,
    },
    subserie: {
        type: Number,
        required: true,
        min: 2,
    },
    consecutive: {
        type: Number,
        required: true,
        min: 5,
    },
});
TrdSchema.methods.getConsecutive = function () {
    return this.consecutive;
};
exports.default = (0, mongoose_1.model)('trd', TrdSchema);
