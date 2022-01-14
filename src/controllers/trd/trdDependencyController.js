"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDependency = exports.getDependency = exports.getAllDependencies = exports.createDependency = void 0;
// Importing our models
var trdDependency_1 = __importDefault(require("../../models/trd/trdDependency"));
// Importing the factory
var handlerFactory_1 = require("../handlerFactory");
var createDependency = (0, handlerFactory_1.createOne)(trdDependency_1.default);
exports.createDependency = createDependency;
var getAllDependencies = (0, handlerFactory_1.findAll)(trdDependency_1.default);
exports.getAllDependencies = getAllDependencies;
var getDependency = (0, handlerFactory_1.findOne)(trdDependency_1.default);
exports.getDependency = getDependency;
var updateDependency = (0, handlerFactory_1.updateOne)(trdDependency_1.default);
exports.updateDependency = updateDependency;
