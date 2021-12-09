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
exports.uploadPunctualLightVehicles = exports.getVehicleNumber = exports.updatePunctualLightVehicle = exports.createPunctualLightVehicle = void 0;
// Importing own models
var punctuallightVehicleModel_1 = __importDefault(require("../../../../models/ordinaries/vehicles/light/punctuallightVehicleModel"));
var userModel_1 = require("../../../../models/users/userModel");
// Importing the factory
var ordinaryFactory = __importStar(require("../../../ordinaryFactory"));
var uploadPunctualLightVehicles = ordinaryFactory.uploadVehicle;
exports.uploadPunctualLightVehicles = uploadPunctualLightVehicles;
var getVehicleNumber = ordinaryFactory.getVehicleNumber(punctuallightVehicleModel_1.default);
exports.getVehicleNumber = getVehicleNumber;
var createPunctualLightVehicle = ordinaryFactory.createOrdinary(punctuallightVehicleModel_1.default, [userModel_1.UserRoles.AccessControl], {
    checkAccessControl: false,
}, {
    correctAccessControl: false,
});
exports.createPunctualLightVehicle = createPunctualLightVehicle;
var updatePunctualLightVehicle = ordinaryFactory.updateOrdinary(punctuallightVehicleModel_1.default);
exports.updatePunctualLightVehicle = updatePunctualLightVehicle;
