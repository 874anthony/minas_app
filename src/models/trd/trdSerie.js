"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TrdSerie = new mongoose_1.Schema({
    dependencyID: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.default = (0, mongoose_1.model)('trd_serie', TrdSerie);
