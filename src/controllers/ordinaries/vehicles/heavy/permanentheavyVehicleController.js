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
exports.uploadPermanentHeavyVehicles = exports.getVehicleNumber = exports.updatePermanentHeavyVehicle = exports.createPermanentHeavyVehicle = void 0;
// Importing own models
var permanentheavyVehicleModel_1 = __importDefault(require("../../../../models/ordinaries/vehicles/heavy/permanentheavyVehicleModel"));
var cronJob_1 = __importDefault(require("../../../../utils/cronJob"));
var userModel_1 = require("../../../../models/users/userModel");
// Importing the factory
var ordinaryFactory = __importStar(require("../../../ordinaryFactory"));
var uploadPermanentHeavyVehicles = ordinaryFactory.uploadVehicle;
exports.uploadPermanentHeavyVehicles = uploadPermanentHeavyVehicles;
var getVehicleNumber = ordinaryFactory.getVehicleNumber(permanentheavyVehicleModel_1.default);
exports.getVehicleNumber = getVehicleNumber;
var createPermanentHeavyVehicle = ordinaryFactory.createOrdinary(permanentheavyVehicleModel_1.default, [userModel_1.UserRoles.AccessControl, userModel_1.UserRoles.SST, userModel_1.UserRoles.Auditing], {
    checkAccessControl: false,
    checkSST: false,
    checkAuditing: false,
}, {
    correctAccessControl: false,
    correctSST: false,
    correcAuditing: false,
});
exports.createPermanentHeavyVehicle = createPermanentHeavyVehicle;
var updatePermanentHeavyVehicle = ordinaryFactory.updateOrdinary(permanentheavyVehicleModel_1.default);
exports.updatePermanentHeavyVehicle = updatePermanentHeavyVehicle;
// Cron Job to verify if Date.now() > qrCodeDate
var job = (0, cronJob_1.default)(permanentheavyVehicleModel_1.default);
job.start();
