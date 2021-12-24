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
exports.exportExcelVehicle = exports.exportExcelPerson = exports.getVehicleNumber = exports.uploadVehicle = exports.uploadPerson = exports.inactiveOrdsByCompany = exports.updateOrdinary = exports.createOrdinary = exports.getOrdById = exports.getAllOrds = exports.checkContractorID = exports.checkCompanyID = exports.getOrdinaryCitizenship = void 0;
var exceljs_1 = __importDefault(require("exceljs"));
var fs_1 = __importDefault(require("fs"));
// Importing our utils to this controller
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
var httpException_1 = __importDefault(require("../utils/httpException"));
var apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
// Utils here
var ordinariesEnum_1 = require("../interfaces/ordinaries/ordinariesEnum");
var trdImportAll_1 = require("../models/trd/trdImportAll");
var multerConfig_1 = require("../utils/multerConfig");
var email_1 = __importDefault(require("../utils/email"));
// Models here
var userModel_1 = __importDefault(require("../models/users/userModel"));
var workflowModel_1 = __importDefault(require("../models/workflows/workflowModel"));
var eventsModel_1 = __importDefault(require("../models/events/eventsModel"));
var trdOrdinary_1 = __importDefault(require("../models/trd/trdOrdinary"));
// ================================================ Endpoints starts here =========================================
// UPLOADS MIDDLEWARES
// const uploadAttached = uploadOrdinaryPerson.single()
var uploadPerson = multerConfig_1.uploadOrdinaryPerson.fields([
    { name: 'docHealth', maxCount: 1 },
    { name: 'docPension', maxCount: 1 },
    { name: 'docARL', maxCount: 1 },
    { name: 'docSocialSecurity', maxCount: 1 },
    { name: 'docMedicalFitness', maxCount: 1 },
    { name: 'docCitizenship', maxCount: 1 },
    { name: 'docCV', maxCount: 1 },
    { name: 'docDrivingLicense', maxCount: 1 },
    { name: 'docPsycho', maxCount: 1 },
    { name: 'docDefDrivingLicense', maxCount: 1 },
    { name: 'docDrivingTest', maxCount: 1 },
    { name: 'docCraneOperator', maxCount: 1 },
    { name: 'docSafeworkHeights', maxCount: 1 },
    { name: 'docCompetenceCert', maxCount: 1 },
    { name: 'attached', maxCount: 20 },
]);
exports.uploadPerson = uploadPerson;
var uploadVehicle = multerConfig_1.uploadOrdinaryVehicle.fields([
    { name: 'docSoat', maxCount: 1 },
    { name: 'docPropertyCard', maxCount: 1 },
    { name: 'docTechno', maxCount: 1 },
    { name: 'docInspectionVehicle', maxCount: 1 },
    { name: 'docMachineCard', maxCount: 1 },
    { name: 'docBill', maxCount: 1 },
    { name: 'docAduana', maxCount: 1 },
    { name: 'docOperationCard', maxCount: 1 },
    { name: 'docSISCONMP', maxCount: 1 },
    { name: 'docVehicleListCheck', maxCount: 1 },
    { name: 'docTeamCert', maxCount: 1 },
    { name: 'docQualityCert', maxCount: 1 },
    { name: 'attached', maxCount: 20 },
]);
exports.uploadVehicle = uploadVehicle;
// AQUI TERMINA LOS UPLOADS MIDDLEWARES
var getOrdinaryCitizenship = function (Model) {
    return (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, currentOrdinary;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, Model.findById(id)];
                case 1:
                    currentOrdinary = _a.sent();
                    if (!currentOrdinary) {
                        return [2 /*return*/, next(new httpException_1.default('No hay ningún ordinario con ese ID, intente nuevamente', 404))];
                    }
                    req['ordCitizenship'] = currentOrdinary.citizenship;
                    next();
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.getOrdinaryCitizenship = getOrdinaryCitizenship;
var getVehicleNumber = function (Model) {
    return (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, currentOrdinary;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, Model.findById(id)];
                case 1:
                    currentOrdinary = _a.sent();
                    if (!currentOrdinary) {
                        return [2 /*return*/, next(new httpException_1.default('No hay ningún ordinario con ese ID, intente nuevamente', 404))];
                    }
                    req['ordVehicleNumber'] = currentOrdinary.vehicleNumber;
                    next();
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.getVehicleNumber = getVehicleNumber;
var checkCompanyID = function (req, res, next) {
    var companyID = req.params.idCompany;
    req.query.companyID = companyID;
    next();
};
exports.checkCompanyID = checkCompanyID;
var checkContractorID = function (req, res, next) {
    var contractorID = req.params.idContractor;
    req.query.contractorID = contractorID;
    next();
};
exports.checkContractorID = checkContractorID;
// AQUI TERMINA LOS MIDDLEWARES
var createOrdinary = function (Model, Roles, checkRoles, subsanarRoles) {
    return (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var body, arrayFilenames, dependency, trdOrdinary, year, dependencyCode, consecutive, radicado, newOrdinaryPerson, bodyEvent, usersPromises, usersArray, usersID, ordinaryOpts, bodyWorkflow, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.params.idCompany && !req.params.idContractor) {
                        return [2 /*return*/, next(new httpException_1.default('No ha asociado ningun ID de la compañía, intente nuevamente', 404))];
                    }
                    if (!req.files) {
                        return [2 /*return*/, next(new httpException_1.default('No ha subido ningún archivo, intente nuevamente', 404))];
                    }
                    body = __assign({}, req.body);
                    arrayFilenames = [];
                    // Looping through the req.files object to set it to the body
                    Object.keys(req.files).forEach(function (el) {
                        if (el === 'attached') {
                            Object.values(req.files[el]).forEach(function (el2, i) {
                                arrayFilenames.push(req.files[el][i].filename);
                            });
                        }
                        else {
                            body[el] = req.files[el][0].filename;
                        }
                    });
                    body['attached'] = arrayFilenames;
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
                    if (req.params.idCompany) {
                        body.companyID = req.params.idCompany;
                    }
                    else if (req.params.idContractor) {
                        body.contractorID = req.params.idContractor;
                    }
                    return [4 /*yield*/, Model.create(body)];
                case 6:
                    newOrdinaryPerson = _a.sent();
                    if (!newOrdinaryPerson) {
                        return [2 /*return*/, next(new httpException_1.default('No se ha podido crear el ordinario, intente nuevamente', 404))];
                    }
                    bodyEvent = {
                        radicado: newOrdinaryPerson._id,
                        action: 'Envío de formulario',
                        description: 'Se generó el nuevo tipo de ingreso',
                    };
                    return [4 /*yield*/, eventsModel_1.default.create(bodyEvent)];
                case 7:
                    _a.sent();
                    usersPromises = Roles.map(function (role) { return __awaiter(void 0, void 0, void 0, function () {
                        var rolesQuery;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    rolesQuery = new apiFeatures_1.default(userModel_1.default.find(), {
                                        role: role,
                                        status: 'true',
                                        fields: '_id,status,email',
                                    })
                                        .filter()
                                        .limitFields();
                                    return [4 /*yield*/, rolesQuery.query];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(usersPromises)];
                case 8:
                    usersArray = _a.sent();
                    usersID = [];
                    ordinaryOpts = {
                        radicado: radicado,
                        ordinaryType: ordinariesEnum_1.getModelByType[newOrdinaryPerson.ordinaryType],
                    };
                    usersArray.forEach(function (ArrayPerRole) {
                        ArrayPerRole.forEach(function (element) { return __awaiter(void 0, void 0, void 0, function () {
                            var error_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        usersID.push(element._id);
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, new email_1.default(element).sendOrdNotification(ordinaryOpts)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_2 = _a.sent();
                                        return [2 /*return*/, next(new httpException_1.default('Hubo un error al enviar el correo, por favor intente más tarde', 500))];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                    });
                    bodyWorkflow = __assign(__assign({ radicado: newOrdinaryPerson._id, ordinaryType: newOrdinaryPerson.ordinaryType, roles: usersID, observations: req.body.observations }, checkRoles), subsanarRoles);
                    _a.label = 9;
                case 9:
                    _a.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, workflowModel_1.default.create(bodyWorkflow)];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 11:
                    error_1 = _a.sent();
                    return [2 /*return*/, next(new httpException_1.default('No se ha asignado correctamente el workflow, por favor vuelva a intentar', 500))];
                case 12:
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
exports.createOrdinary = createOrdinary;
var updateOrdinary = function (Model) {
    return (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, ordinaryUpdated, body, arrayFilenames, workflowDoc_1, bodyEvent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, Model.findById(id)];
                case 1:
                    ordinaryUpdated = _a.sent();
                    if (!ordinaryUpdated) {
                        return [2 /*return*/, next(new httpException_1.default('No hay un ordinario con ese ID, intente nuevamente!', 404))];
                    }
                    body = __assign({}, req.body);
                    arrayFilenames = [];
                    if (req.files) {
                        // Looping through the req.files object to set it to the body
                        Object.keys(req.files).forEach(function (el) {
                            if (el === 'attached') {
                                Object.values(req.files[el]).forEach(function (el2, i) {
                                    arrayFilenames.push(req.files[el][i].filename);
                                });
                            }
                            else {
                                body[el] = req.files[el][0].filename;
                            }
                        });
                    }
                    body['attached'] = arrayFilenames;
                    body['updatedAt'] = Date.now();
                    Object.keys(body).forEach(function (key) {
                        if (key === 'observations' ||
                            key === 'startDates' ||
                            key === 'finishDates') {
                            ordinaryUpdated[key].push(body[key]);
                        }
                        else {
                            ordinaryUpdated[key] = body[key];
                        }
                    });
                    if (!req.body.isHealing) return [3 /*break*/, 4];
                    ordinaryUpdated.status = ordinariesEnum_1.StatusOrdinary.Pending;
                    return [4 /*yield*/, workflowModel_1.default.findOne({ radicado: id })];
                case 2:
                    workflowDoc_1 = _a.sent();
                    Object.keys(workflowDoc_1._doc).forEach(function (el) {
                        if (el.startsWith('correct')) {
                            workflowDoc_1[el] = false;
                        }
                    });
                    workflowDoc_1['healingTimes'] += 1;
                    return [4 /*yield*/, workflowDoc_1.save({ validateBeforeSave: false })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    bodyEvent = {
                        radicado: id,
                        action: 'Actualización de formulario',
                        description: req.body.isHealing
                            ? 'Subida de documentos por corregir'
                            : 'Se actualizó el registro',
                    };
                    return [4 /*yield*/, eventsModel_1.default.create(bodyEvent)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, ordinaryUpdated.save({ validateBeforeSave: false })];
                case 6:
                    _a.sent();
                    res.status(200).json({
                        status: true,
                        message: 'Se ha actualizado el registro con éxito',
                        ordinaryUpdated: ordinaryUpdated,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.updateOrdinary = updateOrdinary;
var getAllOrds = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var ordinariesPromises, ordinaries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ordinariesPromises = Object.values(ordinariesEnum_1.ModelsOrdinary).map(function (Model) { return __awaiter(void 0, void 0, void 0, function () {
                    var featuresQuery, ordinaryResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                featuresQuery = new apiFeatures_1.default(Model.find(), req.query)
                                    .filter()
                                    .limitFields()
                                    .paginate()
                                    .sort();
                                return [4 /*yield*/, featuresQuery.query.populate([
                                        {
                                            path: 'companyID',
                                            select: 'businessName',
                                        },
                                        {
                                            path: 'contractorID',
                                            select: 'businessName',
                                        },
                                    ])];
                            case 1:
                                ordinaryResult = _a.sent();
                                return [2 /*return*/, ordinaryResult];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(ordinariesPromises)];
            case 1:
                ordinaries = _a.sent();
                res.status(200).json({
                    status: true,
                    ordinaries: ordinaries,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getAllOrds = getAllOrds;
var getOrdById = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, ordinaryType, ordinary;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                ordinaryType = req.body.ordinaryType;
                if (!id)
                    return [2 /*return*/, next(new httpException_1.default('No hay ningún ID, por favor intente nuevamente', 404))];
                return [4 /*yield*/, ordinariesEnum_1.ModelsOrdinary[ordinaryType].findById(id)];
            case 1:
                ordinary = _a.sent();
                if (!ordinary) {
                    return [2 /*return*/, next(new httpException_1.default('No se ha podido encontrar un ordinario, intente nuevamente', 404))];
                }
                res.status(200).json({
                    status: true,
                    ordinary: ordinary,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getOrdById = getOrdById;
var inactiveOrdsByCompany = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var idCompany;
    return __generator(this, function (_a) {
        idCompany = req.params.id;
        Object.values(ordinariesEnum_1.ModelsOrdinary).forEach(function (Model) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Model.updateMany({
                            $match: { $and: [{ companyID: idCompany }, { status: 'ACTIVO' }] },
                        }, {
                            $set: { status: 'INACTIVO', qrCodeDate: null },
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        res.status(200).json({
            status: true,
            message: 'Se ha inactivado a todos los ordinarios con éxito',
        });
        return [2 /*return*/];
    });
}); });
exports.inactiveOrdsByCompany = inactiveOrdsByCompany;
var exportExcelPerson = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var workbook, sheet, path, extension, predicate, ordinariesPromises, ordinaries, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                workbook = new exceljs_1.default.Workbook();
                sheet = workbook.addWorksheet('PERSONAL');
                path = __dirname + "/../../store/reports";
                if (!fs_1.default.existsSync(path)) {
                    fs_1.default.mkdirSync(path, { recursive: true });
                }
                extension = 'xlsx';
                predicate = "ordinaries-person-" + Date.now() + "." + extension;
                sheet.columns = [
                    { header: 'Registro', key: 'radicado', width: 20 },
                    { header: 'ESTADO', key: 'status', width: 20 },
                    { header: 'Fecha inicio labores', key: 'startDates', width: 20 },
                    { header: 'Fecha fin labores', key: 'finishDates', width: 20 },
                    { header: 'Contratista ', key: 'nameCompany', width: 20 },
                    { header: 'Subcontratista ', key: 'nameContractor', width: 20 },
                    { header: 'Cedula', key: 'citizenship', width: 20 },
                    { header: 'Nombre', key: 'name', width: 20 },
                    { header: 'Cargo', key: 'appointment', width: 20 },
                    { header: 'Fecha recepción', key: 'recepcionDate', width: 20 },
                    {
                        header: 'Plazo máximo de autorización',
                        key: 'maxAuthorizationDate',
                        width: 20,
                    },
                    { header: 'Fecha inducción', key: 'inductionDate', width: 20 },
                    { header: 'Vigencia induccion', key: 'inductionVigency', width: 20 },
                    { header: 'Tipo de ingreso', key: 'accessType', width: 20 },
                    { header: 'Sexo', key: 'gender', width: 20 },
                    { header: 'Lugar residencia', key: 'residentPlace', width: 20 },
                    { header: 'Lugar nacimiento', key: 'birthplace', width: 20 },
                    // TODO: Fix docs
                    // { header: 'Salud', key: 'docHealth', width: 20 },
                    // { header: 'Pensión', key: 'docPension', width: 20 },
                    // { header: 'ARL', key: 'docARL', width: 20 },
                    { header: 'Fecha concepto medico', key: 'medicalConceptDate', width: 20 },
                    { header: 'Categoria licencia', key: 'licenseCategory', width: 20 },
                    { header: 'Vigencia licencia', key: 'licenseVigency', width: 20 },
                ];
                ordinariesPromises = Object.values(ordinariesEnum_1.PersonsOrdinary).map(function (Model) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Model.find().populate([
                                    {
                                        path: 'companyID',
                                        select: 'businessName',
                                    },
                                    {
                                        path: 'contractorID',
                                        select: 'businessName companyID',
                                        populate: {
                                            path: 'companyID',
                                            select: 'businessName',
                                        },
                                    },
                                ])];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(ordinariesPromises)];
            case 1:
                ordinaries = _b.sent();
                ordinaries.flat().forEach(function (ordinary) {
                    var nameCompany;
                    var nameContractor;
                    if (Object.keys(ordinary['_doc']).includes('companyID')) {
                        nameCompany = ordinary['_doc']['companyID'].businessName;
                        nameContractor = 'No Aplica';
                    }
                    else if (Object.keys(ordinary['_doc']).includes('contractorID')) {
                        nameContractor = ordinary['_doc']['contractorID'].businessName;
                        nameCompany =
                            ordinary['_doc']['contractorID'].companyID['businessName'];
                    }
                    var ordinaryExcel = __assign(__assign({}, ordinary['_doc']), { nameCompany: nameCompany, nameContractor: nameContractor });
                    sheet.addRow(ordinaryExcel);
                });
                //Making the first line in excel bold
                sheet.getRow(1).eachCell(function (cell) {
                    cell.font = {
                        name: 'Arial Black',
                        color: { argb: '000000' },
                        family: 2,
                        size: 10,
                        bold: true,
                    };
                    cell.fill = {
                        type: 'gradient',
                        gradient: 'angle',
                        degree: 0,
                        stops: [
                            { position: 0, color: { argb: 'FFE5CC' } },
                            { position: 0.9, color: { argb: 'FFFFFFFF' } },
                            { position: 1, color: { argb: 'FFE5CC' } },
                        ],
                    };
                    cell.alignment = { vertical: 'middle', horizontal: 'center' };
                });
                (_a = sheet.getRows(2, ordinaries.flat().length)) === null || _a === void 0 ? void 0 : _a.forEach(function (cell) {
                    cell.font = { bold: true };
                    cell.alignment = { vertical: 'middle', horizontal: 'center' };
                });
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, workbook.xlsx.writeFile(path + "/" + predicate)];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                return [2 /*return*/, next(new httpException_1.default('Something went wrong', 500))];
            case 5:
                res.download(path + "/" + predicate);
                return [2 /*return*/];
        }
    });
}); });
exports.exportExcelPerson = exportExcelPerson;
var exportExcelVehicle = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var workbook, sheet, path, extension, predicate, ordinariesPromises, ordinaries, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                workbook = new exceljs_1.default.Workbook();
                sheet = workbook.addWorksheet('VEHICULOS');
                path = __dirname + "/../../store/reports";
                if (!fs_1.default.existsSync(path)) {
                    fs_1.default.mkdirSync(path, { recursive: true });
                }
                extension = 'xlsx';
                predicate = "ordinaries-vehicles-" + Date.now() + "." + extension;
                sheet.columns = [
                    { header: 'Registro', key: 'radicado', width: 20 },
                    { header: 'ESTADO', key: 'status', width: 20 },
                    { header: 'Fecha inicio labores', key: 'startDates', width: 20 },
                    { header: 'Fecha fin labores', key: 'finishDates', width: 20 },
                    { header: 'Contratista ', key: 'nameCompany', width: 20 },
                    { header: 'Subcontratista ', key: 'nameContractor', width: 20 },
                    { header: 'MAQ/VEHI', key: 'type', width: 20 },
                    { header: 'Tipo', key: 'vehicleType', width: 20 },
                    { header: 'Placa/número de serie', key: 'vehicleNumber', width: 20 },
                    { header: 'Tipo de ingreso', key: 'accessType', width: 20 },
                    { header: 'Tipo de servicio', key: 'serviceType', width: 20 },
                    { header: 'Vigencia SOAT', key: 'soatVigency', width: 20 },
                    { header: 'Vigencia tecnomecanica', key: 'technoVigency', width: 20 },
                    {
                        header: 'Vigencia Tarjeta de Operacion',
                        key: 'operationCardVigency',
                        width: 20,
                    },
                ];
                ordinariesPromises = Object.values(ordinariesEnum_1.VehiclesOrdinary).map(function (Model) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Model.find().populate([
                                    {
                                        path: 'companyID',
                                        select: 'businessName',
                                    },
                                    {
                                        path: 'contractorID',
                                        select: 'businessName companyID',
                                        populate: {
                                            path: 'companyID',
                                            select: 'businessName',
                                        },
                                    },
                                ])];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(ordinariesPromises)];
            case 1:
                ordinaries = _b.sent();
                ordinaries.flat().forEach(function (ordinary) {
                    var nameCompany;
                    var nameContractor;
                    if (Object.keys(ordinary['_doc']).includes('companyID')) {
                        nameCompany = ordinary['_doc']['companyID'].businessName;
                        nameContractor = 'No Aplica';
                    }
                    else if (Object.keys(ordinary['_doc']).includes('contractorID')) {
                        nameContractor = ordinary['_doc']['contractorID'].businessName;
                        nameCompany =
                            ordinary['_doc']['contractorID'].companyID['businessName'];
                    }
                    var ordinaryExcel = __assign(__assign({}, ordinary['_doc']), { nameCompany: nameCompany, nameContractor: nameContractor });
                    sheet.addRow(ordinaryExcel);
                });
                //Making the first line in excel bold
                sheet.getRow(1).eachCell(function (cell) {
                    cell.font = {
                        name: 'Arial Black',
                        color: { argb: '000000' },
                        family: 2,
                        size: 10,
                        bold: true,
                    };
                    cell.fill = {
                        type: 'gradient',
                        gradient: 'angle',
                        degree: 0,
                        stops: [
                            { position: 0, color: { argb: 'FFE5CC' } },
                            { position: 0.9, color: { argb: 'FFFFFFFF' } },
                            { position: 1, color: { argb: 'FFE5CC' } },
                        ],
                    };
                    cell.alignment = { vertical: 'middle', horizontal: 'center' };
                });
                (_a = sheet.getRows(2, ordinaries.flat().length)) === null || _a === void 0 ? void 0 : _a.forEach(function (cell) {
                    cell.font = { bold: true };
                    cell.alignment = { vertical: 'middle', horizontal: 'center' };
                });
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, workbook.xlsx.writeFile(path + "/" + predicate)];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                error_4 = _b.sent();
                return [2 /*return*/, next(new httpException_1.default('Something went wrong', 500))];
            case 5:
                res.download(path + "/" + predicate);
                return [2 /*return*/];
        }
    });
}); });
exports.exportExcelVehicle = exportExcelVehicle;
