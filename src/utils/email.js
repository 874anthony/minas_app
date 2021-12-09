"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var ejs_1 = __importDefault(require("ejs"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var html_to_text_1 = require("html-to-text");
var Email = /** @class */ (function () {
    function Email(user, url) {
        this.to = user.email;
        this.url = url;
        this.from = "Control de Acceso - Gecelca <" + process.env.EMAIL_FROM + ">";
    }
    Email.prototype.newTransport = function () {
        // if (process.env.NODE_ENV === 'production') {
        // 	// Sendgrid - PRODUCTION
        // 	return 1;
        // }
        // 1) Create a transporter
        return nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    };
    Email.prototype.send = function (template, subject, data) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mailOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ejs_1.default.renderFile(__dirname + "/../views/email/" + template + ".ejs", __assign({ url: this.url }, data))];
                    case 1:
                        html = _a.sent();
                        mailOptions = {
                            from: this.from,
                            to: this.to,
                            subject: subject,
                            html: html,
                            text: (0, html_to_text_1.htmlToText)(html),
                            // TODO: make this dynamic
                            attachments: [
                                {
                                    filename: 'image-2.png',
                                    path: __dirname + "/../views/images/image-2.png",
                                    cid: 'unique@gecelca-logo',
                                },
                            ],
                        };
                        // 3) Create the transport to send the email
                        return [4 /*yield*/, this.newTransport().sendMail(mailOptions)];
                    case 2:
                        // 3) Create the transport to send the email
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Email.prototype.sendWelcomeCompany = function (companyCredentials) {
        return __awaiter(this, void 0, void 0, function () {
            var genPassword, radicado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        genPassword = companyCredentials.genPassword, radicado = companyCredentials.radicado;
                        return [4 /*yield*/, this.send('welcomeCompany', 'Su acceso a la mina ha sido aprobado!', {
                                genPassword: genPassword,
                                radicado: radicado,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Email;
}());
exports.default = Email;
