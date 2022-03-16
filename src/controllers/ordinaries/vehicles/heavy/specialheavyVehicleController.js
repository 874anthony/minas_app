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
exports.uploadSpecialHeavyVehicles = exports.getVehicleNumber = exports.updateSpecialHeavyVehicle = exports.createSpecialHeavyVehicle = void 0;
// Importing own models
var specialheavyVehicleModel_1 = __importDefault(require("../../../../models/ordinaries/vehicles/heavy/specialheavyVehicleModel"));
var cronJob_1 = __importDefault(require("../../../../utils/cronJob"));
var userModel_1 = require("../../../../models/users/userModel");
// Importing the factory
var ordinaryFactory = __importStar(require("../../../ordinaryFactory"));
var uploadSpecialHeavyVehicles = ordinaryFactory.uploadVehicle;
exports.uploadSpecialHeavyVehicles = uploadSpecialHeavyVehicles;
var getVehicleNumber = ordinaryFactory.getVehicleNumber(specialheavyVehicleModel_1.default);
exports.getVehicleNumber = getVehicleNumber;
var createSpecialHeavyVehicle = ordinaryFactory.createOrdinary(specialheavyVehicleModel_1.default, [userModel_1.UserRoles.AccessControl, userModel_1.UserRoles.SST, userModel_1.UserRoles.Auditing], {
    checkAccessControl: false,
    checkSST: false,
    checkAuditing: false,
}, {
    correctAccessControl: false,
    correctSST: false,
    correctAuditing: false,
});
exports.createSpecialHeavyVehicle = createSpecialHeavyVehicle;
var updateSpecialHeavyVehicle = ordinaryFactory.updateOrdinary(specialheavyVehicleModel_1.default);
exports.updateSpecialHeavyVehicle = updateSpecialHeavyVehicle;
// Cron Job to verify if Date.now() > qrCodeDate
(0, cronJob_1.default)(specialheavyVehicleModel_1.default).start();
