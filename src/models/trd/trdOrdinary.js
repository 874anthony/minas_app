"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// Definying the schema
var TrdOrdinarySchema = new mongoose_1.Schema({
    dependency: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.default = (0, mongoose_1.model)('trd_ordinaries', TrdOrdinarySchema);
