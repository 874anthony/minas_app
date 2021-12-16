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
// Importing own controllers
var permanentPersonRoutes_1 = __importDefault(require("../ordinaries/persons/permanentPersonRoutes"));
var contractorController = __importStar(require("../../controllers/contractor/contractorController"));
// Enabling the mergeParams to get access to the idCompany
var router = express_1.default.Router({ mergeParams: true });
router
    .route('/')
    .get(contractorController.getAllContractors)
    .post(contractorController.uploadContractorDocs, contractorController.addContractor, contractorController.createContractor);
router.use('/:idContractor/ordinaries-person/permanent-person', permanentPersonRoutes_1.default);
// Routes with the id
router
    .route('/:id')
    .get(contractorController.getContractor)
    .put(contractorController.getContractorNIT, contractorController.uploadContractorDocs, contractorController.updateContractor);
router
    .route('/accept-pending-contractor/:id')
    .patch(contractorController.acceptContractor);
router
    .route('/reject-pending-contractor/:id')
    .delete(contractorController.rejectContractor);
exports.default = router;
