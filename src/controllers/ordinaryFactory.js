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
exports.uploadPunctualWorkPerson = exports.uploadPermanentPerson = exports.createOrdinay = exports.changeStatusOrdinary = void 0;
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
// Importing our utils to this controller
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
var httpException_1 = __importDefault(require("../utils/httpException"));
var apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
// Import own models
var ordinariesEnum_1 = require("../interfaces/ordinaries/ordinariesEnum");
var trdImportAll_1 = require("../models/trd/trdImportAll");
var userModel_1 = __importStar(require("../models/users/userModel"));
var workflowModel_1 = __importStar(require("../models/workflows/workflowModel"));
var trdOrdinary_1 = __importDefault(require("../models/trd/trdOrdinary"));
// ================================== MULTER CONFIGURATION TO HANDLE THE DOCUMENTS ===========================================
// Configuring first the type of the storage
var multerStorageOrdinary = multer_1.default.diskStorage({
    // Define the destination
    destination: function (req, file, callback) {
        var directory = "store/documents/ordinaries/person/" + req.body.citizenship;
        if (!fs_1.default.existsSync(directory)) {
            fs_1.default.mkdirSync(directory, { recursive: true });
        }
        callback(null, directory);
    },
    filename: function (req, file, callback) {
        // Extracting the extension.
        var extension = file.mimetype.split('/')[1];
        callback(null, "ordinary-" + req.body.citizenship + "-" + Date.now() + "." + extension);
    },
});
// Filtering for only PDF files
var multerFilterOrdinary = function (req, file, callback) {
    if (file.mimetype.split('/')[1] === 'pdf') {
        callback(null, true);
    }
    else {
        callback(new httpException_1.default('No es un pdf, por favor, solo suba archivos PDF', 404), false);
    }
};
var uploadOrdinaryPerson = (0, multer_1.default)({
    storage: multerStorageOrdinary,
    fileFilter: multerFilterOrdinary,
});
// ================================================ Endpoints starts here =========================================
var getKey = function (field, user) {
    return "" + field + Object.keys(userModel_1.UserRoles)[Object.values(userModel_1.UserRoles).indexOf(user.role)];
};
var getModel = function (ordinaryType) {
    return ordinariesEnum_1.ModelsOrdinary[ordinaryType];
};
// UPLOADS MIDDLEWARES
var uploadPermanentPerson = uploadOrdinaryPerson.fields([
    { name: 'docCovid19', maxCount: 1 },
    { name: 'docHealth', maxCount: 1 },
    { name: 'docPension', maxCount: 1 },
    { name: 'docSocialSecurity', maxCount: 1 },
    { name: 'docMedicalFitness', maxCount: 1 },
    { name: 'docCitizenship', maxCount: 1 },
]);
exports.uploadPermanentPerson = uploadPermanentPerson;
var uploadPunctualWorkPerson = uploadOrdinaryPerson.fields([
    { name: 'docCovid19', maxCount: 1 },
    { name: 'docHealth', maxCount: 1 },
    { name: 'docPension', maxCount: 1 },
    { name: 'docSocialSecurity', maxCount: 1 },
    { name: 'docCitizenship', maxCount: 1 },
]);
exports.uploadPunctualWorkPerson = uploadPunctualWorkPerson;
// AQUI TERMINA LOS UPLOADS MIDDLEWARES
var createOrdinay = function (Model, Roles, checkRoles, subsanarRoles) {
    return (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var body, dependency, trdOrdinary, year, dependencyCode, consecutive, radicado, newOrdinaryPerson, usersPromises, usersID, usersArray, bodyWorkflow, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.files) {
                        return [2 /*return*/, next(new httpException_1.default('No ha subido ningún archivo, intente nuevamente', 404))];
                    }
                    body = __assign({}, req.body);
                    // Looping through the req.files object to set it to the body
                    Object.keys(req.files).forEach(function (el) { return (body[el] = req.files[el][0].filename); });
                    return [4 /*yield*/, trdImportAll_1.TRDDependency.findById(body.dependency)];
                case 1:
                    dependency = _a.sent();
                    if (!dependency) {
                        return [2 /*return*/, next(new httpException_1.default('No se ha encontrado ningúna tipología creada!', 404))];
                    }
                    return [4 /*yield*/, trdOrdinary_1.default.findOne({
                            dependency: body.dependency,
                        })];
                case 2:
                    trdOrdinary = _a.sent();
                    if (!!trdOrdinary) return [3 /*break*/, 4];
                    return [4 /*yield*/, trdOrdinary_1.default.create({
                            dependency: body.dependency,
                        })];
                case 3:
                    trdOrdinary = _a.sent();
                    _a.label = 4;
                case 4:
                    year = new Date().getFullYear();
                    dependencyCode = dependency.dependencyCode;
                    consecutive = trdOrdinary.getConsecutive() + 1;
                    consecutive = ('000000' + consecutive).slice(-6);
                    radicado = "" + year + dependencyCode + consecutive + "9";
                    // INCREMENT THE CONSECUTIVE
                    trdOrdinary.consecutive = trdOrdinary.getConsecutive() + 1;
                    return [4 /*yield*/, trdOrdinary.save({ validateBeforeSave: false })];
                case 5:
                    _a.sent();
                    body.radicado = radicado;
                    return [4 /*yield*/, Model.create(body)];
                case 6:
                    newOrdinaryPerson = _a.sent();
                    if (!newOrdinaryPerson) {
                        return [2 /*return*/, next(new httpException_1.default('No se ha podido crear el ordinario, intente nuevamente', 404))];
                    }
                    usersPromises = Roles.map(function (role) { return __awaiter(void 0, void 0, void 0, function () {
                        var rolesQuery;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    rolesQuery = new apiFeatures_1.default(userModel_1.default.find(), {
                                        role: role,
                                        status: 'true',
                                        fields: '_id,status',
                                    })
                                        .filter()
                                        .limitFields();
                                    return [4 /*yield*/, rolesQuery.query];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); });
                    usersID = [];
                    return [4 /*yield*/, Promise.all(usersPromises)];
                case 7:
                    usersArray = _a.sent();
                    usersArray.forEach(function (ArrayPerRole) {
                        ArrayPerRole.forEach(function (element) {
                            usersID.push(element._id);
                        });
                    });
                    bodyWorkflow = __assign(__assign({ radicado: newOrdinaryPerson._id, ordinaryType: newOrdinaryPerson.ordinaryType, roles: usersID, observations: req.body.observations }, checkRoles), subsanarRoles);
                    _a.label = 8;
                case 8:
                    _a.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, workflowModel_1.default.create(bodyWorkflow)];
                case 9:
                    _a.sent();
                    return [3 /*break*/, 11];
                case 10:
                    error_1 = _a.sent();
                    return [2 /*return*/, next(new httpException_1.default('No se ha asignado correctamente el workflow, por favor vuelva a intentar', 500))];
                case 11:
                    res.status(200).json({
                        status: true,
                        message: 'Se ha creado el ordinario con éxito',
                        ordinary: newOrdinaryPerson,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.createOrdinay = createOrdinay;
var changeStatusOrdinary = function () {
    return (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, body, userID, excludedField, user, workflowDoc, checkKey, correctKey, Model, docMatched, checkArray, allTrues, Model, docMatched;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    body = __assign({}, req.body);
                    userID = req['user']._id;
                    excludedField = workflowModel_1.StatusWorkflow.Approved;
                    return [4 /*yield*/, userModel_1.default.findById(userID)];
                case 1:
                    user = _a.sent();
                    // Check if they put 'POR VISAR' in the request.body
                    if (Object.values(body).includes(excludedField)) {
                        return [2 /*return*/, next(new httpException_1.default('No se cambiar el status a Visado, intente nuevamente', 404))];
                    }
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
                    if (!(checkKey === 'checkSSFF')) return [3 /*break*/, 6];
                    Model = getModel(req.body.ordinaryType);
                    return [4 /*yield*/, Model.findById(workflowDoc.radicado)];
                case 3:
                    docMatched = _a.sent();
                    docMatched.status = ordinariesEnum_1.StatusOrdinary.Forbidden;
                    return [4 /*yield*/, docMatched.save({ validateBeforeSave: false })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, workflowDoc.remove()];
                case 5:
                    _a.sent();
                    return [2 /*return*/, res.status(204).json({
                            status: true,
                            message: 'Seguridad Física rechazó el proceso - Documento eliminado.',
                        })];
                case 6:
                    // Modify the status.
                    workflowDoc[checkKey] = body.check;
                    workflowDoc[correctKey] = body.correct;
                    if (req.body.observations) {
                        workflowDoc.observations = body.observations;
                    }
                    if (body.status)
                        workflowDoc.status = body.status;
                    return [4 /*yield*/, workflowDoc.save({ validateBeforeSave: false })];
                case 7:
                    _a.sent();
                    checkArray = [];
                    Object.keys(workflowDoc._doc).forEach(function (el) {
                        if (el.startsWith('check')) {
                            checkArray.push(el);
                        }
                    });
                    allTrues = checkArray.every(function (value) {
                        return workflowDoc[value] === true;
                    });
                    if (!allTrues) return [3 /*break*/, 11];
                    Model = getModel(req.body.ordinaryType);
                    return [4 /*yield*/, Model.findById(workflowDoc.radicado)];
                case 8:
                    docMatched = _a.sent();
                    docMatched.status = ordinariesEnum_1.StatusOrdinary.Active;
                    return [4 /*yield*/, docMatched.save({ validateBeforeSave: false })];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, workflowDoc.remove()];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11:
                    res
                        .status(200)
                        .json({ status: true, message: 'El proceso fue actualizado con éxito' });
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.changeStatusOrdinary = changeStatusOrdinary;
