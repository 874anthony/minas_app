"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// Definying the schema
var VisitorlightVehicleSchema = new mongoose_1.Schema({
    radicado: {
        type: String,
        default: 'Sin radicado',
    },
    status: {
        type: String,
        default: 'PENDIENTE',
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
    startDates: [Date],
    finishDates: [Date],
    type: {
        type: String,
        required: true,
    },
    vehicleType: {
        type: String,
        required: true,
    },
    vehicleNumber: {
        type: String,
        required: true,
        unique: true,
    },
    ordinaryType: {
        type: String,
        default: 'visitorVehicle',
    },
    serviceType: {
        type: String,
        required: true,
    },
    soatVigency: Date,
    docSoat: String,
    docSISCONMP: String,
    docVehicleListCheck: String,
    technoVigency: Date,
    operationCardVigency: Date,
});
exports.default = (0, mongoose_1.model)('visitor_vehicle', VisitorlightVehicleSchema);
