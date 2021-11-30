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
exports.changeStatusPermanent = exports.rejectSSFFPermanent = exports.uploadPermanentPersons = exports.createPermanentPerson = void 0;
// Importing own models
var permanentPersonModel_1 = __importDefault(require("../../models/ordinaries/permanentPersonModel"));
var userModel_1 = require("../../models/users/userModel");
var ordinaryFactory = __importStar(require("../ordinaryFactory"));
var uploadPermanentPersons = ordinaryFactory.uploadPermanentPerson;
exports.uploadPermanentPersons = uploadPermanentPersons;
var createPermanentPerson = ordinaryFactory.createOrdinay(permanentPersonModel_1.default, [userModel_1.UserRoles.AccessControl], {
    checkAccessControl: false,
    checkRSE: false,
    checkSSFF: false,
    checkSISO: false,
    checkAuditing: false,
    checkSMIN: false,
}, {
    correctAccessControl: false,
    correctRSE: false,
    correctSISO: false,
    correctAuditing: false,
    correctSMIN: false,
});
exports.createPermanentPerson = createPermanentPerson;
var rejectSSFFPermanent = ordinaryFactory.rejectSSFF(permanentPersonModel_1.default);
exports.rejectSSFFPermanent = rejectSSFFPermanent;
var changeStatusPermanent = ordinaryFactory.changeStatusOrdinary();
exports.changeStatusPermanent = changeStatusPermanent;
