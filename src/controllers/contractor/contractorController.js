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
exports.uploadContractorDocs = exports.acceptContractor = exports.addContractor = exports.createContractor = exports.getContractor = exports.getAllContractors = void 0;
// // Importing our utils to this controller
// import HttpException from '../../utils/httpException';
// import catchAsync from '../../utils/catchAsync';
// import sendEmail from '../../utils/email';
// Own models
var contractorModel_1 = __importDefault(require("../../models/contractors/contractorModel"));
// Own Factory
var factory = __importStar(require("../companyFactory"));
// // ================================================ Middlewares starts here =========================================
var uploadContractorDocs = factory.uploadCompanyDocs;
exports.uploadContractorDocs = uploadContractorDocs;
var addContractor = function (req, res, next) {
    if (!req.body.company)
        req.body.company = req.params.idCompany;
    next();
};
exports.addContractor = addContractor;
// // ================================================ Endpoints starts here =========================================
var getAllContractors = factory.findAll(contractorModel_1.default);
exports.getAllContractors = getAllContractors;
var getContractor = factory.findOne(contractorModel_1.default);
exports.getContractor = getContractor;
var createContractor = factory.createOne(contractorModel_1.default);
exports.createContractor = createContractor;
var acceptContractor = factory.acceptOne(contractorModel_1.default);
exports.acceptContractor = acceptContractor;
