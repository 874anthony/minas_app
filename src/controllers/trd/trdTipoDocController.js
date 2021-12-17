"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTipoDocBySerieDepSubs = exports.updateTipoDoc = exports.getTipoDoc = exports.getAllTipoDocs = exports.createTipoDoc = void 0;
// Importing our models
var trdTipoDoc_1 = __importDefault(require("../../models/trd/trdTipoDoc"));
// Importing the factory
var handlerFactory_1 = require("../handlerFactory");
var getTipoDocBySerieDepSubs = function (req, res, next) {
    req.query.dependencyID = req.params.idDependency;
    req.query.serieID = req.params.idSerie;
    req.query.subSerieID = req.params.idsubserie;
    next();
};
exports.getTipoDocBySerieDepSubs = getTipoDocBySerieDepSubs;
var createTipoDoc = (0, handlerFactory_1.createOne)(trdTipoDoc_1.default);
exports.createTipoDoc = createTipoDoc;
var getAllTipoDocs = (0, handlerFactory_1.findAll)(trdTipoDoc_1.default);
exports.getAllTipoDocs = getAllTipoDocs;
var getTipoDoc = (0, handlerFactory_1.findOne)(trdTipoDoc_1.default);
exports.getTipoDoc = getTipoDoc;
var updateTipoDoc = (0, handlerFactory_1.updateOne)(trdTipoDoc_1.default);
exports.updateTipoDoc = updateTipoDoc;
