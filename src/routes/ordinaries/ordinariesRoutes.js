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
var contractorController_1 = require("../../controllers/contractor/contractorController");
var ordinaryFactory = __importStar(require("../../controllers/ordinaryFactory"));
var router = express_1.default.Router({ mergeParams: true });
// Aliases routes
router
    .route('/ordinaries-by-company')
    .get(ordinaryFactory.checkCompanyID, ordinaryFactory.getAllOrds);
router
    .route('/ordinaries-by-contractor/:idContractor')
    .get(ordinaryFactory.checkContractorID, ordinaryFactory.getAllOrds);
router.route('/inactivate-all').put(ordinaryFactory.inactiveOrdsByCompany);
router.route('/activate-all').put(ordinaryFactory.activeOrdsByCompany);
router.route('/inactivate-all-contractors').put(contractorController_1.inactiveOrdsByContractor);
router.route('/activate-all-contractors').put(contractorController_1.activeOrdsByContractor);
router.route('/generate-report-persons').get(ordinaryFactory.exportExcelPerson);
router
    .route('/generate-report-vehicles')
    .get(ordinaryFactory.exportExcelVehicle);
router.route('/').get(ordinaryFactory.getAllOrds);
router.route('/:id').get(ordinaryFactory.getOrdById);
router.post('/:id/auth-extension', function (req, res) {
    var id = req.params.id;
    var date = req.body.date;
    return res.send('Extension requested.');
});
exports.default = router;
