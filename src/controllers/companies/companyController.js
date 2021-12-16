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
exports.getCompanyNIT = exports.loginCompany = exports.getPendingCompanies = exports.uploadCompanyDocs = exports.updateCompany = exports.rejectCompany = exports.acceptCompany = exports.createCompany = exports.getCompany = exports.getAllCompanies = void 0;
var cron_1 = require("cron");
// Own models
var companyModel_1 = __importDefault(require("../../models/companies/companyModel"));
// Own Factory
var factory = __importStar(require("../companyFactory"));
var authController_1 = require("../auth/authController");
// // ================================================ Middlewares starts here =========================================
var uploadCompanyDocs = factory.uploadCompanyDocs;
exports.uploadCompanyDocs = uploadCompanyDocs;
var getPendingCompanies = function (req, res, next) {
    req.query.status = 'PENDIENTE';
    next();
};
exports.getPendingCompanies = getPendingCompanies;
// // ================================================ Endpoints starts here =========================================
var getAllCompanies = factory.findAll(companyModel_1.default);
exports.getAllCompanies = getAllCompanies;
var getCompany = factory.findOne(companyModel_1.default, {
    path: 'contratistas',
    select: 'businessName nit email address phone legalRepresentative -company',
});
exports.getCompany = getCompany;
var createCompany = factory.createOne(companyModel_1.default);
exports.createCompany = createCompany;
var updateCompany = factory.updateOne(companyModel_1.default);
exports.updateCompany = updateCompany;
// Approve a pending company and autogenerate 'Radicado'
var acceptCompany = factory.acceptOne(companyModel_1.default);
exports.acceptCompany = acceptCompany;
var rejectCompany = factory.rejectOne(companyModel_1.default);
exports.rejectCompany = rejectCompany;
var getCompanyNIT = factory.getCompanyNIT(companyModel_1.default);
exports.getCompanyNIT = getCompanyNIT;
var loginCompany = (0, authController_1.login)(companyModel_1.default);
exports.loginCompany = loginCompany;
var job = new cron_1.CronJob('* * * * * *', function () { return __awaiter(void 0, void 0, void 0, function () {
    var date;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                date = new Date();
                date.setMonth(date.getMonth() - 1); //1 month ago
                return [4 /*yield*/, companyModel_1.default.updateMany({
                        docSocialSecurityAt: { $lte: date },
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
