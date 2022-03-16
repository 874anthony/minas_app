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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var contractorController_1 = require("../../controllers/contractor/contractorController");
var ordinaryFactory = __importStar(require("../../controllers/ordinaryFactory"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var ejs_1 = __importDefault(require("ejs"));
var html_to_text_1 = require("html-to-text");
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
router.post('/auth-extension', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, cc, name, businessName, date, _b, EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD, transporter, parsedt, capDate, html, info;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, cc = _a.cc, name = _a.name, businessName = _a.businessName, date = _a.date;
                _b = process.env, EMAIL_HOST = _b.EMAIL_HOST, EMAIL_PORT = _b.EMAIL_PORT, EMAIL_USERNAME = _b.EMAIL_USERNAME, EMAIL_PASSWORD = _b.EMAIL_PASSWORD;
                transporter = nodemailer_1.default.createTransport({
                    host: EMAIL_HOST,
                    port: parseInt(EMAIL_PORT),
                    auth: {
                        user: EMAIL_USERNAME,
                        pass: EMAIL_PASSWORD,
                    },
                });
                parsedt = new Date(date).toLocaleString('es-CO', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                capDate = parsedt.charAt(0).toUpperCase() + parsedt.slice(1);
                return [4 /*yield*/, ejs_1.default.renderFile("".concat(__dirname, "/../../views/email/auth-extension.ejs"), { cc: cc, name: name, businessName: businessName, date: capDate })];
            case 1:
                html = _c.sent();
                return [4 /*yield*/, transporter.sendMail({
                        from: EMAIL_USERNAME,
                        to: 'lopezarizagianlucas@gmail.com',
                        subject: "".concat(businessName, " - SOLICITUD DE EXTENSI\u00D3N DE AUTORIZACI\u00D3N "),
                        html: html,
                        text: (0, html_to_text_1.htmlToText)(html),
                        attachments: [
                            {
                                filename: 'image-2.png',
                                path: "".concat(__dirname, "/../../views/images/image-2.jfif"),
                                cid: 'unique@gecelca-logo',
                            },
                        ],
                    })];
            case 2:
                info = _c.sent();
                if (info === null || info === void 0 ? void 0 : info.accepted) {
                    return [2 /*return*/, res.status(200).json({ message: 'Email enviado correctamente.' })];
                }
                res.status(500).json({ message: 'Ha ocurrido un error.' });
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
