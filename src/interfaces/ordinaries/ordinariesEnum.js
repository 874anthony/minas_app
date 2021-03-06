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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesOrdinary = exports.PersonsOrdinary = exports.ModelsOrdinary = exports.getModelByType = exports.StatusOrdinary = exports.Gender = void 0;
var ordinariesModels = __importStar(require("../../models/ordinaries/importAllOrdinaries"));
var Gender;
(function (Gender) {
    Gender["Men"] = "Hombre";
    Gender["Woman"] = "Mujer";
    Gender["Other"] = "Otro";
})(Gender = exports.Gender || (exports.Gender = {}));
var StatusOrdinary;
(function (StatusOrdinary) {
    StatusOrdinary["Active"] = "ACTIVO";
    StatusOrdinary["Finished"] = "FINALIZADO";
    StatusOrdinary["Pending"] = "PENDIENTE";
    StatusOrdinary["Inactive"] = "INACTIVO";
    StatusOrdinary["Rejected"] = "RECHAZADO";
    StatusOrdinary["Sanitation"] = "SUBSANAR";
    StatusOrdinary["Visa"] = "POR VISAR";
    StatusOrdinary["Forbidden"] = "PROHIBIDO";
})(StatusOrdinary = exports.StatusOrdinary || (exports.StatusOrdinary = {}));
exports.getModelByType = {
    permanentPerson: 'Persona permanente',
    punctualworkPerson: 'Persona trabajo puntual',
    specialworkPerson: 'Persona especial',
    visitorPerson: 'Persona visitante',
    visitorVehicle: 'Vehiculo visitante',
    permanentLightVehicle: 'Vehiculo liviano permanente',
    punctualLightVehicle: 'Vehiculo liviano puntual',
    permanentHeavyVehicle: 'Vehiculo pesado permanente',
    punctualHeavyVehicle: 'Vehiculo pesado puntual',
    specialHeavyVehicle: ' Vehiculo especial',
    permanentMachinery: ' Maquinaria pesada permanente',
    punctualMachinery: ' Maquinaria pesada puntual',
};
exports.ModelsOrdinary = {
    // Personas
    visitorPerson: ordinariesModels.VisitorPerson,
    permanentPerson: ordinariesModels.PermanentPersonModel,
    punctualworkPerson: ordinariesModels.PunctualWorkPerson,
    specialworkPerson: ordinariesModels.SpecialWorkPerson,
    // Vehiculos
    visitorVehicle: ordinariesModels.VisitorVehicle,
    permanentLightVehicle: ordinariesModels.PermanentLightVehicle,
    punctualLightVehicle: ordinariesModels.PunctualLightVehicle,
    permanentHeavyVehicle: ordinariesModels.PermanentHeavyVehicle,
    punctualHeavyVehicle: ordinariesModels.PunctualHeavyVehicle,
    specialHeavyVehicle: ordinariesModels.SpecialHeavyVehicle,
    // Machinery
    permanentMachinery: ordinariesModels.PermanentMachinery,
    punctualMachinery: ordinariesModels.PunctualMachinery,
};
exports.PersonsOrdinary = {
    permanentPerson: ordinariesModels.PermanentPersonModel,
    punctualworkPerson: ordinariesModels.PunctualWorkPerson,
    specialworkPerson: ordinariesModels.SpecialWorkPerson,
    visitorPerson: ordinariesModels.VisitorPerson,
};
exports.VehiclesOrdinary = {
    visitorVehicle: ordinariesModels.VisitorVehicle,
    permanentLightVehicle: ordinariesModels.PermanentLightVehicle,
    punctualLightVehicle: ordinariesModels.PunctualLightVehicle,
    permanentHeavyVehicle: ordinariesModels.PermanentHeavyVehicle,
    punctualHeavyVehicle: ordinariesModels.PunctualHeavyVehicle,
    specialHeavyVehicle: ordinariesModels.SpecialHeavyVehicle,
    permanentMachinery: ordinariesModels.PermanentMachinery,
    punctualMachinery: ordinariesModels.PunctualMachinery,
};
