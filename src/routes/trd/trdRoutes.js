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
router.route('/dependency').post(trdDependencyController.createDependency);
// SERIES ROUTES
router.route('/dependency/:id/serie').post(trdSerieController.createSerie);
// SUBSERIES ROUTES
router
    .route('/dependency/:id/serie/:idSerie/subserie')
    .post(trdSubSerieController.createSubSerie);
// DOCUMENT ROUTES
router
    .route('/dependency/:id/serie/:idserie/subserie/:idsubserie/tipodoc')
    .post(trdTipoDocController.createTipoDoc);
exports.default = router;
