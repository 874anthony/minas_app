"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusWorkflow = void 0;
var mongoose_1 = require("mongoose");
var ordinariesEnum_1 = require("../../interfaces/ordinaries/ordinariesEnum");
var StatusWorkflow;
(function (StatusWorkflow) {
    StatusWorkflow["Blocked"] = "BLOQUEADO";
    StatusWorkflow["Sanitation"] = "SUBSANACION";
    StatusWorkflow["Pending"] = "PENDIENTE";
    StatusWorkflow["InProcess"] = "EN PROCESO";
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
    isFirstTime: {
        type: Boolean,
        default: true,
    },
    status: {
        type: String,
        enum: [StatusWorkflow],
        default: StatusWorkflow.Pending,
    },
    ordinaryType: {
        type: String,
        required: true,
    },
    healingTimes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
    },
});
// Helpers;
var getModel = function (ordinaryType) {
    return ordinariesEnum_1.ModelsOrdinary[ordinaryType];
};
var getArray = function (Document, field) {
    var fieldsArray = [];
    Object.keys(Document).forEach(function (el) {
        if (el.startsWith(field)) {
            fieldsArray.push(el);
        }
    });
    return fieldsArray;
};
//================================================== DOCUMENT MIDDLEWARES =======================================
// PRE SAVE
WorkflowSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var correctArray, oneTrue, Model, docMatched;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    correctArray = getArray(this['_doc'], 'correct');
                    oneTrue = correctArray.some(function (val) { return _this[val] === true; });
                    if (!oneTrue) return [3 /*break*/, 3];
                    Model = getModel(this.ordinaryType);
                    return [4 /*yield*/, Model.findById(this.radicado)];
                case 1:
                    docMatched = _a.sent();
                    docMatched.status = ordinariesEnum_1.StatusOrdinary.Sanitation;
                    return [4 /*yield*/, docMatched.save({ validateBeforeSave: false })];
                case 2:
                    _a.sent();
                    this.status = StatusWorkflow.Sanitation;
                    this.isFirstTime = false;
                    return [3 /*break*/, 4];
                case 3:
                    this.status = StatusWorkflow.Pending;
                    _a.label = 4;
                case 4:
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
// POST SAVE
WorkflowSchema.post('save', function (doc, next) {
    return __awaiter(this, void 0, void 0, function () {
        var Model, docMatched;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!this.isModified('checkSSFF') || this.isNew)
                        return [2 /*return*/, next()];
                    if (!(this.checkSSFF === false)) return [3 /*break*/, 4];
                    Model = getModel(this.ordinaryType);
                    return [4 /*yield*/, Model.findById(this.radicado)];
                case 1:
                    docMatched = _a.sent();
                    docMatched.status = ordinariesEnum_1.StatusOrdinary.Forbidden;
                    return [4 /*yield*/, docMatched.save({ validateBeforeSave: false })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, this.remove()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
WorkflowSchema.post('save', function (doc, next) {
    return __awaiter(this, void 0, void 0, function () {
        var checkArray, allTrues, Model, docMatched;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    checkArray = getArray(this['_doc'], 'check');
                    allTrues = checkArray.every(function (value) { return _this[value] === true; });
                    if (!allTrues) return [3 /*break*/, 4];
                    Model = getModel(this.ordinaryType);
                    return [4 /*yield*/, Model.findById(this.radicado)];
                case 1:
                    docMatched = _a.sent();
                    docMatched.status = ordinariesEnum_1.StatusOrdinary.Visa;
                    return [4 /*yield*/, docMatched.save({ validateBeforeSave: false })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, this.remove()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
//================================================== DOCUMENT MIDDLEWARES =======================================
exports.default = (0, mongoose_1.model)('workflow_events', WorkflowSchema);
