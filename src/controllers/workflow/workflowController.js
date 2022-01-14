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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getWorkflosAdmin = exports.getOneWorkflow = exports.changeStatusOrdinary = exports.getAllOrdinariesType = exports.checkRole = void 0;
// // Importing our utils to this controller
var httpException_1 = __importDefault(require("../../utils/httpException"));
var catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
var apiFeatures_1 = __importDefault(require("../../utils/apiFeatures"));
var ordinariesEnum_1 = require("../../interfaces/ordinaries/ordinariesEnum");
// Importing own models
var userModel_1 = __importStar(require("../../models/users/userModel"));
var workflowModel_1 = __importDefault(require("../../models/workflows/workflowModel"));
var eventsModel_1 = __importDefault(require("../../models/events/eventsModel"));
// Helpers methods
var getKey = function (field, user) {
    return "" + field + Object.keys(userModel_1.UserRoles)[Object.values(userModel_1.UserRoles).indexOf(user.role)];
};
var getModel = function (ordinaryType) {
    return ordinariesEnum_1.ModelsOrdinary[ordinaryType];
};
var ModelsPerRole = {
    'Control de Acceso': [
        'permanentPerson',
        'punctualworkPerson',
        'visitorPerson',
        'specialworkPerson',
        'visitorVehicle',
        'permanentLightVehicle',
        'permanentHeavyVehicle',
        'punctualLightVehicle',
        'punctualHeavyVehicle',
        'specialHeavyVehicle',
        'permanentMachinery',
        'punctualMachinery',
    ],
    'Responsabilidad Social Empresarial': ['permanentPerson'],
    'Seguridad y Salud en el Trabajo': [
        'permanentPerson',
        'specialworkPerson',
        'permanentLightVehicle',
        'permanentHeavyVehicle',
        'specialHeavyVehicle',
        'permanentMachinery',
        'punctualMachinery',
    ],
    'Seguridad Física': ['permanentPerson'],
    Interventoría: [
        'permanentPerson',
        'specialworkPerson',
        'permanentLightVehicle',
        'permanentHeavyVehicle',
        'specialHeavyVehicle',
        'permanentMachinery',
        'punctualMachinery',
    ],
    'Gerencia Servicios Mineros': ['permanentPerson'],
};
// Helpers methods Ends HERE
// MIDDLEWARES STARTS HERE
var checkRole = function (req, res, next) {
    var userID = req['user']._id;
    req.query.roles = userID;
    next();
};
exports.checkRole = checkRole;
// METHODS STARTS HERE
var getAllOrdinariesType = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var queryModified, userID, user, ordinariesPopulated, ordinaries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queryModified = __assign({}, req.query);
                userID = req['user']._id;
                return [4 /*yield*/, userModel_1.default.findById(userID)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, next(new httpException_1.default('No hay un usuario logeado con ese ID, intente nuevamente', 401))];
                }
                ordinariesPopulated = ModelsPerRole[user.role].map(function (keyModel) { return __awaiter(void 0, void 0, void 0, function () {
                    var Model, populateQuery, ordinaryResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                Model = ordinariesEnum_1.ModelsOrdinary[keyModel];
                                queryModified['ordinaryType'] = keyModel;
                                populateQuery = new apiFeatures_1.default(workflowModel_1.default.find(), queryModified)
                                    .filter()
                                    .limitFields()
                                    .sort()
                                    .paginate();
                                return [4 /*yield*/, populateQuery.query.populate({
                                        path: 'radicado',
                                        select: '-__v',
                                        model: Model,
                                        populate: [
                                            {
                                                path: 'companyID',
                                                select: 'businessName',
                                            },
                                            {
                                                path: 'contractorID',
                                                select: 'businessName',
                                            },
                                        ],
                                    })];
                            case 1:
                                ordinaryResult = _a.sent();
                                return [2 /*return*/, ordinaryResult];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(ordinariesPopulated)];
            case 2:
                ordinaries = _a.sent();
                res.status(200).json({
                    status: true,
                    ordinaries: ordinaries,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getAllOrdinariesType = getAllOrdinariesType;
var changeStatusOrdinary = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, body, userID, user, workflowDoc, action, description, checkKey, correctKey, Model, docMatched, Model, docMatched, bodyEvent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                body = __assign({}, req.body);
                userID = req['user']._id;
                return [4 /*yield*/, userModel_1.default.findById(userID)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, next(new httpException_1.default('No hay un usuario con ese token, inténtelo nuevamente!', 401))];
                }
                return [4 /*yield*/, workflowModel_1.default.findById(id)];
            case 2:
                workflowDoc = _a.sent();
                if (!workflowDoc) {
                    return [2 /*return*/, next(new httpException_1.default('No existe un proceso con ese ID, intente nuevamente', 404))];
                }
                checkKey = getKey('check', user);
                correctKey = getKey('correct', user);
                if (!(checkKey === 'checkSSFF' && body.check === false)) return [3 /*break*/, 6];
                Model = getModel(workflowDoc.ordinaryType);
                return [4 /*yield*/, Model.findById(workflowDoc.radicado)];
            case 3:
                docMatched = _a.sent();
                action = 'Actualización Tramitador - Rechazado';
                description = "El registro ha sido anulado por " + user.role;
                docMatched.status = ordinariesEnum_1.StatusOrdinary.Rejected;
                return [4 /*yield*/, docMatched.save({ validateBeforeSave: false })];
            case 4:
                _a.sent();
                return [4 /*yield*/, workflowDoc.remove()];
            case 5:
                _a.sent();
                return [2 /*return*/, res.status(204).json({
                        status: true,
                        message: 'El proceso ha sido actualizado con éxito',
                    })];
            case 6:
                // Modify the status.
                workflowDoc[checkKey] = body.check;
                workflowDoc[correctKey] = body.correct;
                if (!req.body.observations) return [3 /*break*/, 9];
                Model = getModel(workflowDoc.ordinaryType);
                return [4 /*yield*/, Model.findById(workflowDoc.radicado)];
            case 7:
                docMatched = _a.sent();
                docMatched.observations.push(req.body.observations);
                return [4 /*yield*/, docMatched.save({ validateBeforeSave: false })];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9:
                if (body.check === false && body.correct === true) {
                    action = 'Actualización Tramitador - Subsanar';
                    description = "Se mandado a subsanar por " + user.role;
                }
                else if (body.check === true && body.correct === false) {
                    action = 'Actualización Tramitador - Aprobado';
                    description = "El registro ha pasado la aprobaci\u00F3n de " + user.role;
                }
                bodyEvent = {
                    radicado: workflowDoc.radicado,
                    action: action,
                    description: description,
                };
                return [4 /*yield*/, eventsModel_1.default.create(bodyEvent)];
            case 10:
                _a.sent();
                return [4 /*yield*/, workflowDoc.save({ validateBeforeSave: false })];
            case 11:
                _a.sent();
                res
                    .status(200)
                    .json({ status: true, message: 'El proceso fue actualizado con éxito' });
                return [2 /*return*/];
        }
    });
}); });
exports.changeStatusOrdinary = changeStatusOrdinary;
var getOneWorkflow = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, workflowDoc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, workflowModel_1.default.findOne({ radicado: id })];
            case 1:
                workflowDoc = _a.sent();
                if (!workflowDoc)
                    return [2 /*return*/, next(new httpException_1.default('No se ha encontrado un workflow con ese ID!', 404))];
                res.status(200).json({
                    status: true,
                    workflow: workflowDoc,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getOneWorkflow = getOneWorkflow;
var getWorkflosAdmin = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var features, workflows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                features = new apiFeatures_1.default(workflowModel_1.default.find(), req.query)
                    .filter()
                    .paginate()
                    .sort()
                    .limitFields();
                return [4 /*yield*/, features.query];
            case 1:
                workflows = _a.sent();
                if (workflows.length === 0) {
                    return [2 /*return*/, next(new httpException_1.default('No hay documentos en trámite', 204))];
                }
                res.status(200).json({
                    status: true,
                    workflows: workflows,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getWorkflosAdmin = getWorkflosAdmin;
