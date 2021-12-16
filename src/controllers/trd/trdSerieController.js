"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSerie = exports.getSerie = exports.getAllSeries = exports.createSerie = void 0;
// Importing our models
var trdSerie_1 = __importDefault(require("../../models/trd/trdSerie"));
// Importing the factory
var handlerFactory_1 = require("../handlerFactory");
var createSerie = (0, handlerFactory_1.createOne)(trdSerie_1.default);
exports.createSerie = createSerie;
var getAllSeries = (0, handlerFactory_1.findAll)(trdSerie_1.default);
exports.getAllSeries = getAllSeries;
var getSerie = (0, handlerFactory_1.findOne)(trdSerie_1.default);
exports.getSerie = getSerie;
var updateSerie = (0, handlerFactory_1.updateOne)(trdSerie_1.default);
exports.updateSerie = updateSerie;
