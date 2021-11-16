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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPendingCompanies = exports.uploadCompanyDocs = exports.acceptCompany = exports.createCompany = exports.getCompany = exports.getAllCompanies = void 0;
// Own models
var companyModel_1 = __importDefault(require("../../models/companies/companyModel"));
// Own Factory
var factory = __importStar(require("../companyFactory"));
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
// Approve a pending company and autogenerate 'Radicado'
var acceptCompany = factory.acceptOne(companyModel_1.default);
exports.acceptCompany = acceptCompany;
