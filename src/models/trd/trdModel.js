"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// interface TrdModel extends Model<TrdInterface> {
// 	getConsecutive(): number;
// }
// Definying the schema
var TrdSchema = new mongoose_1.Schema({
    dependency: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'trd_dependency',
        required: true,
    },
    serie: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'trd_serie',
        required: true,
    },
    subserie: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.default = (0, mongoose_1.model)('trd', TrdSchema);
