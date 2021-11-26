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
// Importing 3rd-party packages
var express_1 = __importDefault(require("express"));
// Importing the controllers
var permanentPersonController = __importStar(require("../../controllers/ordinaries/permanentPersonController"));
var authController = __importStar(require("../../controllers/auth/authController"));
var workflowController = __importStar(require("../../controllers/workflow/workflowController"));
var router = express_1.default.Router({ mergeParams: true });
router
    .route('/permanent-person')
    .post(permanentPersonController.uploadPermanentPersons, permanentPersonController.createPermanentPerson)
    .get(authController.guardLogin, workflowController.checkRole, workflowController.getAllPermanents);
router
    .route('/permanent-person/:id')
    .patch(permanentPersonController.changeStatusPermanent);
exports.default = router;
