"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusWorkflow = void 0;
var mongoose_1 = require("mongoose");
var StatusWorkflow;
(function (StatusWorkflow) {
    StatusWorkflow["Blocked"] = "BLOQUEADO";
    StatusWorkflow["Sanitation"] = "SUBSANACION";
    StatusWorkflow["Pending"] = "PENDIENTE";
    StatusWorkflow["Rejected"] = "RECHAZADO";
    StatusWorkflow["Approved"] = "APROBADO";
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
    correctAccessControl: {
        type: Boolean,
    },
    correctRSE: {
        type: Boolean,
    },
    correctSISO: {
        type: Boolean,
    },
    correctSMIN: {
        type: Boolean,
    },
    numberTimes: {
        type: Number,
        default: 1,
    },
    status: {
        type: String,
        enum: [StatusWorkflow],
        default: StatusWorkflow.Pending,
    },
    observations: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
    },
});
// Document middlewares
WorkflowSchema.post('save', function (doc, next) {
    var newObject = __assign({}, doc);
    var checkArray = [];
    Object.keys(newObject._doc).forEach(function (el) {
        if (el.startsWith('check')) {
            checkArray.push(el);
        }
    });
    var allTrues = checkArray.every(function (value) {
        return newObject._doc[value] === true;
    });
    if (allTrues) {
        console.log('Todos son true');
    }
    else {
        console.log('NO Todos son true');
    }
    next();
});
exports.default = (0, mongoose_1.model)('workflow_events', WorkflowSchema);
