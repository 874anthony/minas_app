"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TrdSubserie = new mongoose_1.Schema({
    dependencyID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'trd_dependency',
        required: true,
    },
    serieID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'trd_serie',
        required: true,
    },
    subSerieCode: {
        type: Number,
        required: true,
        min: 2,
        unique: true,
    },
    subSerieName: {
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
exports.default = (0, mongoose_1.model)('trd_subserie', TrdSubserie);
