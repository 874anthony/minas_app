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
exports.acceptCompany = exports.createCompany = exports.getCompany = exports.getAllCompanies = void 0;
// Importing the global handler error and the catchAsync
var httpException_1 = __importDefault(require("../utils/httpException"));
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
// Own models
var companyModel_1 = __importDefault(require("../models/companyModel"));
var trdModel_1 = __importDefault(require("../models/trd/trdModel"));
var trdImportAll_1 = require("../models/trd/trdImportAll");
var getAllCompanies = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var companies;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, companyModel_1.default.find({})];
            case 1:
                companies = _a.sent();
                if (companies.length === 0) {
                    return [2 /*return*/, next(new httpException_1.default('No hay empresas creadas aún!', 204))];
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
exports.getAllCompanies = getAllCompanies;
/**
 * Obtener empresa por el ID;
 * @param id
 */
var getCompany = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, company;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, companyModel_1.default.findById(id)];
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
exports.getCompany = getCompany;
var createCompany = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, companyCreated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                return [4 /*yield*/, companyModel_1.default.create(body)];
            case 1:
                companyCreated = _a.sent();
                return [2 /*return*/, res.status(201).json({
                        status: true,
                        message: 'La empresa se ha creado éxitosamente',
                        company: companyCreated,
                    })];
        }
    });
}); });
exports.createCompany = createCompany;
// Approve a pending company and autogenerate 'Radicado'
var acceptCompany = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, body, companyMatched, dependency, serie, subserie, trd, year, dependencyCode, serieCode, subserieCode, consecutive, radicado;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                body = req.body;
                return [4 /*yield*/, companyModel_1.default.findById(id)];
            case 1:
                companyMatched = _a.sent();
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
                // TODO: Finish generate the password
                // NOW SAVE THE RADICADO, THE STATUS, PASSWORD AND THE UPDATED AT
                companyMatched.radicado = radicado;
                companyMatched.pending = true;
                companyMatched.updatedAt = Date.now();
                return [4 /*yield*/, companyMatched.save({ validateBeforeSave: false })];
            case 9:
                _a.sent();
                // SENDING THE FINAL RESPONSE TO THE CLIENT
                return [2 /*return*/, res.status(200).json({
                        status: true,
                        message: 'La empresa fue aprobada éxitosamente y se le envió un correo con sus credenciales',
                        radicado: radicado,
                    })];
        }
    });
}); });
exports.acceptCompany = acceptCompany;
