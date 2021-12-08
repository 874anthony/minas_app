"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorVehicle = exports.SpecialWorkPerson = exports.VisitorPerson = exports.PunctualWorkPerson = exports.PermanentPersonModel = void 0;
var permanentPersonModel_1 = __importDefault(require("./persons/permanentPersonModel"));
exports.PermanentPersonModel = permanentPersonModel_1.default;
var punctualWorkPersonModel_1 = __importDefault(require("./persons/punctualWorkPersonModel"));
exports.PunctualWorkPerson = punctualWorkPersonModel_1.default;
var visitorPersonModel_1 = __importDefault(require("./persons/visitorPersonModel"));
exports.VisitorPerson = visitorPersonModel_1.default;
var specialWorkPersonModel_1 = __importDefault(require("./persons/specialWorkPersonModel"));
exports.SpecialWorkPerson = specialWorkPersonModel_1.default;
var visitorlightVehicleModel_1 = __importDefault(require("./vehicles/light/visitorlightVehicleModel"));
exports.VisitorVehicle = visitorlightVehicleModel_1.default;
