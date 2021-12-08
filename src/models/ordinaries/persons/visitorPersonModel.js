"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var date_1 = require("../../../utils/date");
// Definying the schema
var VisitorPersonSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    appointment: {
        type: String,
        required: true,
        minlength: 4,
    },
    citizenship: {
        type: Number,
        unique: true,
        required: true,
        min: 7,
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
    residentPlace: {
        type: String,
        minlength: 4,
    },
    licenseCategory: {
        type: String,
        required: true,
        maxlength: [3, 'La categoría solo puede tener 3 letras como máximo'],
        trim: true,
    },
    docHealth: {
        type: String,
    },
    docPension: String,
    docARL: String,
    docCitizenship: {
        type: String,
    },
    docSocialSecurity: String,
    radicado: {
        type: String,
        default: 'Sin radicado',
    },
    observations: [String],
    medicalConceptDate: Date,
    inductionDate: Date,
    inductionVigency: Date,
    companyID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'company',
    },
    contractorID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'contractor',
        required: false,
    },
    startDates: [Date],
    finishDates: [Date],
    status: {
        type: String,
        default: 'PENDIENTE',
    },
    attached: [String],
    recepcionDate: {
        type: Date,
        default: Date.now(),
    },
    maxAuthorizationDate: Date,
    ordinaryType: {
        type: String,
        default: 'visitorPerson',
    },
    licenseVigency: Date,
    updatedAt: {
        type: Date,
    },
});
VisitorPersonSchema.pre('save', function (next) {
    if (this.isNew) {
        var days = 3;
        this.maxAuthorizationDate = (0, date_1.addDate)(this.recepcionDate, days);
    }
    next();
});
exports.default = (0, mongoose_1.model)('visitor_person', VisitorPersonSchema);
