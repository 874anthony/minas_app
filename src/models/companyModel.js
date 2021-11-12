"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var validator_1 = __importDefault(require("validator"));
// Definying the schema
var CompanySchema = new mongoose_1.Schema({
    businessName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    nit: {
        type: Number,
        unique: true,
        required: true,
        min: 7,
    },
    email: {
        type: String,
        validate: {
            validator: function (value) { return validator_1.default.isEmail(value); },
            message: 'El email ingresado no es válidad',
        },
        lowercase: true,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    legalRepresentative: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    },
    docComCam: {
        required: true,
        type: String,
    },
    docRUT: {
        type: String,
        required: true,
    },
    docLegalRepresentativeID: {
        type: String,
        required: true,
    },
    radicado: {
        type: String,
        unique: true,
    },
    pending: {
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
// UserSchema.methods.toJSON = function() {
// var obj = this.toObject()
// delete obj.passwordHash
// return obj
// }
exports.default = (0, mongoose_1.model)('company', CompanySchema);
