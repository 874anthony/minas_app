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
exports.uploadVisitorPerson = exports.uploadPunctualWorkPerson = exports.uploadPermanentPerson = exports.createOrdinary = void 0;
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
// Importing our utils to this controller
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
var httpException_1 = __importDefault(require("../utils/httpException"));
var apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
var trdImportAll_1 = require("../models/trd/trdImportAll");
var userModel_1 = __importDefault(require("../models/users/userModel"));
var workflowModel_1 = __importDefault(require("../models/workflows/workflowModel"));
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
var uploadVisitorPerson = uploadOrdinaryPerson.fields([
    { name: 'docCovid19', maxCount: 1 },
    { name: 'docHealth', maxCount: 1 },
    { name: 'docPension', maxCount: 1 },
    { name: 'docSocialSecurity', maxCount: 1 },
    { name: 'docCitizenship', maxCount: 1 },
]);
exports.uploadVisitorPerson = uploadVisitorPerson;
// AQUI TERMINA LOS UPLOADS MIDDLEWARES
var createOrdinary = function (Model, Roles, checkRoles, subsanarRoles) {
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
                    if (req.params.idCompany)
                        body.companyID = req.params.idCompany;
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
exports.createOrdinary = createOrdinary;
