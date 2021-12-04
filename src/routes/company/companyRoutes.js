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
// Import 3rd-party packages
var express_1 = __importDefault(require("express"));
// Importing own routers
var contractorRoutes_1 = __importDefault(require("../../routes/contractors/contractorRoutes"));
var permanentPersonRoutes_1 = __importDefault(require("../ordinaries/persons/permanentPersonRoutes"));
var punctualworkPersonRoutes_1 = __importDefault(require("../ordinaries/persons/punctualworkPersonRoutes"));
var visitorPersonRoutes_1 = __importDefault(require("../ordinaries/persons/visitorPersonRoutes"));
var workflowRoutes_1 = __importDefault(require("../ordinaries/workflowRoutes"));
// Importing own controllers
var companyController = __importStar(require("../../controllers/companies/companyController"));
var router = express_1.default.Router();
// Nesting routes to redirect to contractorRouter
router.use('/:idCompany/contractors', contractorRoutes_1.default);
router.use('/:idCompany/workflow', workflowRoutes_1.default);
router.use('/:idCompany/ordinaries-person/permanent-person', permanentPersonRoutes_1.default);
router.use('/:idCompany/ordinaries-person/punctual-work-person', punctualworkPersonRoutes_1.default);
router.use('/:idCompany/ordinaries-person/visitor-person', visitorPersonRoutes_1.default);
// Custom routes
router
    .route('/pending-companies')
    .get(companyController.getPendingCompanies, companyController.getAllCompanies);
router.route('/login').post(companyController.loginCompany);
// Routes
router
    .route('/')
    .get(companyController.getAllCompanies)
    .post(companyController.uploadCompanyDocs, companyController.createCompany);
// Routes with the id
router.route('/:id').get(companyController.getCompany);
router
    .route('/accept-pending-company/:id')
    .patch(companyController.acceptCompany);
exports.default = router;
