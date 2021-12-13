"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusWorkflow = void 0;
var mongoose_1 = require("mongoose");
var StatusWorkflow;
(function (StatusWorkflow) {
    StatusWorkflow["Blocked"] = "BLOQUEADO";
    StatusWorkflow["Sanitation"] = "SUBSANACION";
    StatusWorkflow["Pending"] = "PENDIENTE";
    StatusWorkflow["Finished"] = "FINALIZADO";
})(StatusWorkflow = exports.StatusWorkflow || (exports.StatusWorkflow = {}));
var EventsSchema = new mongoose_1.Schema({
    radicado: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Specify the document to be associated with'],
    },
    action: {
        type: String,
        required: [true, 'Must provide an action'],
    },
    description: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
//================================================== DOCUMENT MIDDLEWARES =======================================
exports.default = (0, mongoose_1.model)('events', EventsSchema);
