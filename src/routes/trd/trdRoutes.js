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
var express_1 = __importDefault(require("express"));
// Imports required (controllers)
var trdDependencyController = __importStar(require("../../controllers/trd/trdDependencyController"));
var trdSerieController = __importStar(require("../../controllers/trd/trdSerieController"));
var trdSubSerieController = __importStar(require("../../controllers/trd/trdSubserieController"));
var trdTipoDocController = __importStar(require("../../controllers/trd/trdTipoDocController"));
var router = express_1.default.Router();
// DEPENDENCY ROUTES
router
    .route('/dependency')
    .post(trdDependencyController.createDependency)
    .get(trdDependencyController.getAllDependencies);
router
    .route('/dependency/:id')
    .get(trdDependencyController.getDependency)
    .put(trdDependencyController.updateDependency);
// SERIES ROUTES
router
    .route('/serie')
    .post(trdSerieController.createSerie)
    .get(trdSerieController.getAllSeries);
router
    .route('/dependency/:idDependency/serie/:id')
    .get(trdSerieController.getSerie)
    .put(trdSerieController.updateSerie);
// SUBSERIES ROUTES
router
    .route('/subserie')
    .post(trdSubSerieController.createSubSerie)
    .get(trdSubSerieController.getAllSubseries);
router
    .route('/dependency/:idDependency/serie/:idSerie/subserie/:id')
    .get(trdSubSerieController.getSubserie)
    .put(trdSubSerieController.updateSubserie);
// DOCUMENT ROUTES
router
    .route('/tipodoc')
    .post(trdTipoDocController.createTipoDoc)
    .get(trdTipoDocController.getAllTipoDocs);
router
    .route('/dependency/:idDependency/serie/:idserie/subserie/:idsubserie/tipodoc/:id')
    .get(trdTipoDocController.getTipoDoc)
    .put(trdTipoDocController.updateTipoDoc);
exports.default = router;
