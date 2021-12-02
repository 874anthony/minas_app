"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PunctualWorkPerson = exports.PermanentPerson = void 0;
var permanentPersonModel_1 = __importDefault(require("./persons/permanentPersonModel"));
exports.PermanentPerson = permanentPersonModel_1.default;
var punctualWorkPersonModel_1 = __importDefault(require("./persons/punctualWorkPersonModel"));
exports.PunctualWorkPerson = punctualWorkPersonModel_1.default;
