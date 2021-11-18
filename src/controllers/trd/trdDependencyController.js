"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDependency = void 0;
// Importing our models
var trdDependency_1 = __importDefault(require("../../models/trd/trdDependency"));
// Importing the factory
var trdFactory_1 = require("../trdFactory");
var createDependency = (0, trdFactory_1.createOneTRD)(trdDependency_1.default);
exports.createDependency = createDependency;
