"use strict";
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
exports.contractorsByCompany = exports.getPendingContractors = exports.addContractor = exports.activeOrdsByContractor = exports.inactiveOrdsByContractor = exports.getContractorNIT = exports.uploadContractorDocs = exports.rejectContractor = exports.updateContractor = exports.acceptContractor = exports.createContractor = exports.getContractor = exports.getAllContractors = void 0;
var cron_1 = require("cron");
// Own models
var httpException_1 = __importDefault(require("../../utils/httpException"));
var contractorModel_1 = __importDefault(require("../../models/contractors/contractorModel"));
var ordinariesEnum_1 = require("../../interfaces/ordinaries/ordinariesEnum");
// Own Factory
var companyFactory = __importStar(require("../companyFactory"));
var catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
var apiFeatures_1 = __importDefault(require("../../utils/apiFeatures"));
// // ================================================ Middlewares starts here =========================================
// Middlewares
var uploadContractorDocs = companyFactory.uploadCompanyDocs;
exports.uploadContractorDocs = uploadContractorDocs;
var addContractor = function (req, res, next) {
    if (!req.body.companyID)
        req.body.companyID = req.params.idCompany;
    next();
};
exports.addContractor = addContractor;
var contractorsByCompany = function (req, res, next) {
    if (!req.params.idCompany)
        return next(new httpException_1.default('No hay ID de la compañia padre, intente nuevamente', 404));
    req.query.companyID = req.params.idCompany;
    next();
};
exports.contractorsByCompany = contractorsByCompany;
var getPendingContractors = function (req, res, next) {
    req.query.status = 'PENDIENTE';
    next();
};
exports.getPendingContractors = getPendingContractors;
// // ================================================ Endpoints starts here =========================================
var getAllContractors = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var features, contractors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                features = new apiFeatures_1.default(contractorModel_1.default.find(), req.query)
                    .filter()
                    .sort()
                    .limitFields()
                    .paginate();
                return [4 /*yield*/, features.query.populate([
                        {
                            path: 'companyID',
                            select: 'businessName status',
                        },
                    ])];
            case 1:
                contractors = _a.sent();
                if (contractors.length === 0) {
                    return [2 /*return*/, next(new httpException_1.default('No hay documentos con ese criterio de búsqueda!', 204))];
                }
                return [2 /*return*/, res.status(200).json({
                        status: true,
                        data: {
                            contractors: contractors,
                        },
                    })];
        }
    });
}); });
exports.getAllContractors = getAllContractors;
var getContractor = companyFactory.findOne(contractorModel_1.default);
exports.getContractor = getContractor;
var createContractor = companyFactory.createOne(contractorModel_1.default);
exports.createContractor = createContractor;
var updateContractor = companyFactory.updateOne(contractorModel_1.default);
exports.updateContractor = updateContractor;
var acceptContractor = companyFactory.acceptOne(contractorModel_1.default);
exports.acceptContractor = acceptContractor;
var rejectContractor = companyFactory.rejectOne(contractorModel_1.default);
exports.rejectContractor = rejectContractor;
var getContractorNIT = companyFactory.getCompanyNIT(contractorModel_1.default);
exports.getContractorNIT = getContractorNIT;
var inactiveOrdsByContractor = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var idContractor;
    return __generator(this, function (_a) {
        idContractor = req.params.idContractor;
        Object.values(ordinariesEnum_1.ModelsOrdinary).forEach(function (Model) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Model.updateMany({
                            $match: {
                                $and: [{ contractorID: idContractor }, { status: 'ACTIVO' }],
                            },
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
exports.inactiveOrdsByContractor = inactiveOrdsByContractor;
var activeOrdsByContractor = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var idContractor;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idContractor = req.params.idContractor;
                Object.values(ordinariesEnum_1.ModelsOrdinary).forEach(function (Model) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Model.updateMany({
                                    $match: {
                                        $and: [{ contractorID: idContractor }, { status: 'INACTIVO' }],
                                    },
                                }, {
                                    $set: { status: 'ACTIVO' },
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, contractorModel_1.default.findByIdAndUpdate(idContractor, { status: 'ACTIVO' }, { new: true, validateBeforeSave: false })];
            case 1:
                _a.sent();
                res.status(200).json({
                    status: true,
                    message: 'Se ha activado a todos los ordinarios con éxito',
                });
                return [2 /*return*/];
        }
    });
}); });
exports.activeOrdsByContractor = activeOrdsByContractor;
var job = new cron_1.CronJob('0 1 * * *', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, contractorModel_1.default.updateMany({
                    docSocialSecurityAt: { $lte: Date.now() },
                }, {
                    $set: { status: 'REVISION', docSocialSecurityAt: null },
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }, null);
job.start();
