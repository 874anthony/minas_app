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
exports.uploadPunctualHeavyVehicles = exports.getVehicleNumber = exports.updatePunctualHeavyVehicle = exports.createPunctualHeavyVehicle = void 0;
// Importing own models
var punctualheavyVehicleModel_1 = __importDefault(require("../../../../models/ordinaries/vehicles/heavy/punctualheavyVehicleModel"));
var cronJob_1 = __importDefault(require("../../../../utils/cronJob"));
var userModel_1 = require("../../../../models/users/userModel");
// Importing the factory
var ordinaryFactory = __importStar(require("../../../ordinaryFactory"));
var uploadPunctualHeavyVehicles = ordinaryFactory.uploadVehicle;
exports.uploadPunctualHeavyVehicles = uploadPunctualHeavyVehicles;
var getVehicleNumber = ordinaryFactory.getVehicleNumber(punctualheavyVehicleModel_1.default);
exports.getVehicleNumber = getVehicleNumber;
var createPunctualHeavyVehicle = ordinaryFactory.createOrdinary(punctualheavyVehicleModel_1.default, [
    userModel_1.UserRoles.AccessControl,
], {
    checkAccessControl: false,
}, {
    correctAccessControl: false,
});
exports.createPunctualHeavyVehicle = createPunctualHeavyVehicle;
var updatePunctualHeavyVehicle = ordinaryFactory.updateOrdinary(punctualheavyVehicleModel_1.default);
exports.updatePunctualHeavyVehicle = updatePunctualHeavyVehicle;
// Cron Job to verify if Date.now() > qrCodeDate
var job = (0, cronJob_1.default)(punctualheavyVehicleModel_1.default);
job.start();
