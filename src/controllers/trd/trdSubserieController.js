"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubserie = exports.getAllSubseries = exports.createSubSerie = void 0;
// Importing our models
var trdSubSerie_1 = __importDefault(require("../../models/trd/trdSubSerie"));
// Importing the factory
var handlerFactory_1 = require("../handlerFactory");
var createSubSerie = (0, handlerFactory_1.createOne)(trdSubSerie_1.default);
exports.createSubSerie = createSubSerie;
var getAllSubseries = (0, handlerFactory_1.findAll)(trdSubSerie_1.default);
exports.getAllSubseries = getAllSubseries;
var getSubserie = (0, handlerFactory_1.findOne)(trdSubSerie_1.default);
exports.getSubserie = getSubserie;
