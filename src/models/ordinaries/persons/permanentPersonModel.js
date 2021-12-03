"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// Definying the schema
var PermanentPersonSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    citizenship: {
        type: Number,
        unique: true,
        required: true,
        min: 7,
    },
    appointment: {
        type: String,
        required: true,
        minlength: 4,
    },
    gender: {
        type: String,
        required: true,
        enum: {
            values: ['Hombre', 'Mujer', 'Otro'],
            message: 'El sexo debe ser alguno de los listados',
        },
    },
    birthplace: {
        type: String,
        required: true,
        minlength: 4,
    },
    licenseCategory: {
        type: String,
        required: true,
        maxlength: [3, 'La categoría solo puede tener 3 letras como máximo'],
        trim: true,
    },
    docCovid19: {
        type: String,
    },
    docHealth: {
        type: String,
    },
    docPension: {
        type: String,
    },
    docSocialSecurity: {
        type: String,
    },
    docMedicalFitness: {
        type: String,
    },
    docCitizenship: {
        type: String,
    },
    radicado: {
        type: String,
        default: 'Sin radicado',
    },
    companyID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'company',
    },
    contractorID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'contractor',
        required: false,
    },
    status: {
        type: String,
        default: 'PENDIENTE',
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    ordinaryType: {
        type: String,
        default: 'permanentPerson',
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
exports.default = (0, mongoose_1.model)('permanent_person', PermanentPersonSchema);
