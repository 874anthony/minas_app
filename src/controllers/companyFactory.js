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
exports.uploadCompanyDocs = exports.acceptOne = exports.findOne = exports.findAll = exports.createOne = void 0;
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
// Importing our utils to this controller
var httpException_1 = __importDefault(require("../utils/httpException"));
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
var email_1 = __importDefault(require("../utils/email"));
var apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
// Importing own models to the controller
var trdImportAll_1 = require("../models/trd/trdImportAll");
var trdModel_1 = __importDefault(require("../models/trd/trdModel"));
var companyModel_1 = require("../models/companies/companyModel");
// ================================== MULTER CONFIGURATION TO HANDLE THE DOCUMENTS ===========================================
// Configuring first the type of the storage
var multerStorage = multer_1.default.diskStorage({
    // Define the destination
    destination: function (req, file, callback) {
        var directory = "store/documents/company/" + req.body.nit;
        if (!fs_1.default.existsSync(directory)) {
            fs_1.default.mkdirSync(directory, { recursive: true });
        }
        callback(null, directory);
    },
    filename: function (req, file, callback) {
        // Extracting the extension.
        var extension = file.mimetype.split('/')[1];
        callback(null, "company-" + req.body.nit + "-" + Date.now() + "." + extension);
    },
});
// Filtering for only PDF files
var multerFilter = function (req, file, callback) {
    if (file.mimetype.split('/')[1] === 'pdf') {
        callback(null, true);
    }
    else {
        callback(new httpException_1.default('No es un pdf, por favor, solo suba archivos PDF', 404), false);
    }
};
var upload = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: multerFilter,
});
// ================================================ Endpoints starts here =========================================
var uploadCompanyDocs = upload.fields([
    { name: 'docComCam', maxCount: 1 },
    { name: 'docRUT', maxCount: 1 },
    { name: 'docLegalRepresentativeID', maxCount: 1 },
]);
exports.uploadCompanyDocs = uploadCompanyDocs;
var findAll = function (Model) {
    return (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var filter, features, companies;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filter = {};
                    if (req.params.idCompany)
                        filter = { company: req.params.idCompany };
                    features = new apiFeatures_1.default(Model.find(filter), req.query)
                        .filter()
                        .sort()
                        .limitFields()
                        .paginate();
                    return [4 /*yield*/, features.query];
                case 1:
                    companies = _a.sent();
                    if (companies.length === 0) {
                        return [2 /*return*/, next(new httpException_1.default('No hay empresas con ese criterio de búsqueda!', 204))];
                    }
                    return [2 /*return*/, res.status(200).json({
                            status: true,
                            data: {
                                companies: companies,
                            },
                        })];
            }
        });
    }); });
};
exports.findAll = findAll;
/**
 * Obtener empresa por el ID;
 * @param id
 */
var findOne = function (Model, populateOptions) {
    return (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, query, company;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    query = Model.findById(id);
                    if (populateOptions)
                        query = query.populate(populateOptions);
                    return [4 /*yield*/, query];
                case 1:
                    company = _a.sent();
                    if (!company) {
                        return [2 /*return*/, next(new httpException_1.default('No hay una empresa con este ID', 404))];
                    }
                    return [2 /*return*/, res.status(200).json({
                            status: true,
                            company: company,
                        })];
            }
        });
    }); });
};
exports.findOne = findOne;
var createOne = function (Model) {
    return (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1, body, companyCreated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.files ||
                        !req.files['docComCam'] ||
                        !req.files['docRUT'] ||
                        !req.files['docLegalRepresentativeID']) {
                        return [2 /*return*/, next(new httpException_1.default('No se han cargado todos los archivos, por favor inténtelo nuevamente', 404))];
                    }
                    if (!req.body.company) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Model.findById(req.body.company)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, next(new httpException_1.default('No hay una compañía con ese ID, inténtelo nuevamente', 404))];
                case 4:
                    body = req.body;
                    // Extracting the filenames from the files
                    body.docComCam = req.files['docComCam'][0].filename;
                    body.docRUT = req.files['docRUT'][0].filename;
                    body.docLegalRepresentativeID =
                        req.files['docLegalRepresentativeID'][0].filename;
                    return [4 /*yield*/, Model.create(body)];
                case 5:
                    companyCreated = _a.sent();
                    return [2 /*return*/, res.status(201).json({
                            status: true,
                            message: 'La empresa se ha creado éxitosamente',
                            company: companyCreated,
                        })];
            }
        });
    }); });
};
exports.createOne = createOne;
var acceptOne = function (Model) {
    return (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, body, companyMatched, dependency, serie, subserie, trd, year, dependencyCode, serieCode, subserieCode, consecutive, radicado, genPassword, hashedPassword, emailMessage, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    body = __assign({}, req.body);
                    return [4 /*yield*/, Model.findById(id)];
                case 1:
                    companyMatched = _a.sent();
                    // CHECK IF THE COMPANY EXISTS
                    if (!companyMatched) {
                        return [2 /*return*/, next(new httpException_1.default('No existe una compañía con ese ID, inténtelo nuevamente', 404))];
                    }
                    return [4 /*yield*/, trdImportAll_1.TRDDependency.findById(body.dependency)];
                case 2:
                    dependency = _a.sent();
                    return [4 /*yield*/, trdImportAll_1.TRDSerie.findById(body.serie)];
                case 3:
                    serie = _a.sent();
                    return [4 /*yield*/, trdImportAll_1.TRDSubSerie.findById(body.subserie)];
                case 4:
                    subserie = _a.sent();
                    if (!dependency || !serie || !subserie) {
                        return [2 /*return*/, next(new httpException_1.default('No se ha encontrado ningúna tipología creada!', 404))];
                    }
                    return [4 /*yield*/, trdModel_1.default.findOne({
                            dependency: body.dependency,
                            serie: body.serie,
                            subserie: body.subserie,
                        })];
                case 5:
                    trd = _a.sent();
                    if (!!trd) return [3 /*break*/, 7];
                    return [4 /*yield*/, trdModel_1.default.create({
                            dependency: body.dependency,
                            serie: body.serie,
                            subserie: body.subserie,
                        })];
                case 6:
                    trd = _a.sent();
                    _a.label = 7;
                case 7:
                    year = new Date().getFullYear();
                    dependencyCode = dependency.dependencyCode;
                    serieCode = serie.serieCode;
                    subserieCode = subserie.subSerieCode;
                    consecutive = trd.getConsecutive() + 1;
                    consecutive = ('00000' + consecutive).slice(-5);
                    radicado = "" + year + dependencyCode + serieCode + subserieCode + consecutive + "E";
                    // INCREMENT THE CONSECUTIVE
                    trd.consecutive = trd.getConsecutive() + 1;
                    return [4 /*yield*/, trd.save({ validateBeforeSave: false })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, companyMatched.generatePassword()];
                case 9:
                    genPassword = _a.sent();
                    return [4 /*yield*/, companyMatched.hashPassword(genPassword)];
                case 10:
                    hashedPassword = _a.sent();
                    // NOW SAVE THE RADICADO, THE STATUS, PASSWORD AND THE UPDATED AT
                    companyMatched.password = hashedPassword;
                    companyMatched.radicado = radicado;
                    companyMatched.status = companyModel_1.StatusCompany.Active;
                    companyMatched.updatedAt = Date.now();
                    // To save observations as well
                    if (req.body.observations)
                        companyMatched.observations = req.body.observations;
                    return [4 /*yield*/, companyMatched.save({ validateBeforeSave: false })];
                case 11:
                    _a.sent();
                    emailMessage = "Ha sido aprobado su solicitud de acceso para la mina, la generaci\u00F3n de su empresa se ha generado con el radicado: " + radicado + ". Sus credenciales de accesos son las siguientes:\n\t\t\nEl correo: el mismo con el que se registr\u00F3\nSu contrase\u00F1a: " + genPassword + "\n\nSi tiene alguna duda, no dude en contactar con nosotros!";
                    _a.label = 12;
                case 12:
                    _a.trys.push([12, 14, , 15]);
                    return [4 /*yield*/, (0, email_1.default)({
                            email: companyMatched.email,
                            subject: 'Ha sido aprobado su acceso a la Mina San Jorge!',
                            message: emailMessage,
                        })];
                case 13:
                    _a.sent();
                    return [3 /*break*/, 15];
                case 14:
                    error_2 = _a.sent();
                    return [2 /*return*/, next(new httpException_1.default('Hubo un error al enviar el correo, por favor intente más tarde', 500))];
                case 15: 
                // SENDING THE FINAL RESPONSE TO THE CLIENT
                return [2 /*return*/, res.status(200).json({
                        status: true,
                        message: 'La empresa fue aprobada éxitosamente y se le envió un correo con sus credenciales',
                        radicado: radicado,
                    })];
            }
        });
    }); });
};
exports.acceptOne = acceptOne;