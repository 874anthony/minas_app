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
exports.updateVisitorPerson = exports.uploadVisitorPersons = exports.getCitizenship = exports.createVisitorPerson = void 0;
// Importing own models
var visitorPersonModel_1 = __importDefault(require("../../../models/ordinaries/persons/visitorPersonModel"));
var cronJob_1 = __importDefault(require("../../../utils/cronJob"));
var userModel_1 = require("../../../models/users/userModel");
// Importing the factory
var ordinaryFactory = __importStar(require("../../ordinaryFactory"));
var uploadVisitorPersons = ordinaryFactory.uploadPerson;
exports.uploadVisitorPersons = uploadVisitorPersons;
var getCitizenship = ordinaryFactory.getOrdinaryCitizenship(visitorPersonModel_1.default);
exports.getCitizenship = getCitizenship;
var createVisitorPerson = ordinaryFactory.createOrdinary(visitorPersonModel_1.default, [userModel_1.UserRoles.AccessControl], {
    checkAccessControl: false,
}, {
    correctAccessControl: false,
});
exports.createVisitorPerson = createVisitorPerson;
var updateVisitorPerson = ordinaryFactory.updateOrdinary(visitorPersonModel_1.default);
exports.updateVisitorPerson = updateVisitorPerson;
// Cron Job to verify if Date.now() > qrCodeDate
(0, cronJob_1.default)(visitorPersonModel_1.default).start();
