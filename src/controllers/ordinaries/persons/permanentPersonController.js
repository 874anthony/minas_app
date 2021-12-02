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
exports.changeStatusPermanent = exports.uploadPermanentPersons = exports.createPermanentPerson = void 0;
// Importing own models
var permanentPersonModel_1 = __importDefault(require("../../../models/ordinaries/persons/permanentPersonModel"));
var userModel_1 = require("../../../models/users/userModel");
// Importing the factory
var ordinaryFactory = __importStar(require("../../ordinaryFactory"));
var uploadPermanentPersons = ordinaryFactory.uploadPermanentPerson;
exports.uploadPermanentPersons = uploadPermanentPersons;
var createPermanentPerson = ordinaryFactory.createOrdinay(permanentPersonModel_1.default, [
    userModel_1.UserRoles.AccessControl,
    userModel_1.UserRoles.Auditing,
    userModel_1.UserRoles.RSE,
    userModel_1.UserRoles.SISO,
    userModel_1.UserRoles.SMIN,
    userModel_1.UserRoles.SSFF,
], {
    checkAccessControl: false,
    checkAuditing: false,
    checkRSE: false,
    checkSISO: false,
    checkSMIN: false,
    checkSSFF: false,
}, {
    correctAccessControl: false,
    correctAuditing: false,
    correctRSE: false,
    correctSISO: false,
    correctSMIN: false,
});
exports.createPermanentPerson = createPermanentPerson;
var changeStatusPermanent = ordinaryFactory.changeStatusOrdinary();
exports.changeStatusPermanent = changeStatusPermanent;
