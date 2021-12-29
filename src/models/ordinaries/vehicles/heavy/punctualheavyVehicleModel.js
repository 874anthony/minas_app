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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var date_1 = require("../../../../utils/date");
var ordinariesEnum_1 = require("../../../../interfaces/ordinaries/ordinariesEnum");
var eventsModel_1 = __importDefault(require("../../../events/eventsModel"));
// Definying the schema
var PunctualHeavyVehicleSchema = new mongoose_1.Schema({
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
    startDates: Date,
    finishDates: Date,
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
        default: 'punctualHeavyVehicle',
    },
    serviceType: {
        type: String,
        required: true,
    },
    accessType: String,
    soatVigency: Date,
    docSoat: String,
    docPropertyCard: String,
    docTechno: String,
    docInspectionVehicle: String,
    docMachineCard: String,
    docBill: String,
    docAduana: String,
    docOperationCard: String,
    docSISCONMP: String,
    docVehicleListCheck: String,
    docTeamCert: String,
    docQualityCert: String,
    technoVigency: Date,
    operationCardVigency: Date,
    observations: [String],
    qrCodeDate: Date,
    reasonDescription: String,
});
PunctualHeavyVehicleSchema.pre('save', function (next) {
    if (this.isNew) {
        // const days = 3;
        // this.maxAuthorizationDate = addDate(this.recepcionDate, days);
        this.accessType = ordinariesEnum_1.getModelByType[this.ordinaryType];
    }
    next();
});
PunctualHeavyVehicleSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var bodyEvent, qrCodeDays;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(this.isModified('status') && this.status === 'ACTIVO')) return [3 /*break*/, 2];
                    bodyEvent = {
                        radicado: this._id,
                        action: 'Actualización Registro',
                        description: 'Se aprobó el ingreso y se ha generado un código QR',
                    };
                    return [4 /*yield*/, eventsModel_1.default.create(bodyEvent)];
                case 1:
                    _a.sent();
                    qrCodeDays = 2;
                    this.qrCodeDate = (0, date_1.addDate)(Date.now(), qrCodeDays);
                    _a.label = 2;
                case 2:
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
exports.default = (0, mongoose_1.model)('punctualheavy_vehicle', PunctualHeavyVehicleSchema);
