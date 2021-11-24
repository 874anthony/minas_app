"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusWorkflow = void 0;
var mongoose_1 = require("mongoose");
var StatusWorkflow;
(function (StatusWorkflow) {
    StatusWorkflow["Active"] = "ACTIVO";
    StatusWorkflow["Rehabilitation"] = "SUBSANACION";
    StatusWorkflow["Pending"] = "PENDIENTE";
    StatusWorkflow["Rejected"] = "RECHAZADO";
})(StatusWorkflow = exports.StatusWorkflow || (exports.StatusWorkflow = {}));
var WorkflowSchema = new mongoose_1.Schema({
    radicado: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Especifique el documento al que va a estar asociado'],
        unique: true,
    },
    roles: {
        type: [mongoose_1.Schema.Types.ObjectId],
        required: [
            true,
            'Especifique los usuarios que van a tener acceso a el documento',
        ],
    },
    checkAccessControl: {
        type: Boolean,
    },
    checkRSE: {
        type: Boolean,
    },
    checkSSFF: {
        type: Boolean,
    },
    checkSISO: {
        type: Boolean,
    },
    checkAuditing: {
        type: Boolean,
    },
    checkSMIN: {
        type: Boolean,
    },
    status: {
        type: String,
        enum: [StatusWorkflow],
        default: StatusWorkflow.Pending,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
    },
});
exports.default = (0, mongoose_1.model)('workflow_events', WorkflowSchema);