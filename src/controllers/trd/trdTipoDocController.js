"use strict";
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
exports.createTipoDoc = void 0;
// Importing the global handler error and the catchAsync
var httpException_1 = __importDefault(require("../../utils/httpException"));
var catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
// Importing our models
var trdTipoDoc_1 = __importDefault(require("../../models/trd/trdTipoDoc"));
var createTipoDoc = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var dependencyID, serieID, subSerieID, body, newTipoDoc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dependencyID = req.params.id;
                serieID = req.params.idserie;
                subSerieID = req.params.idsubserie;
                body = req.body;
                if (!body || !dependencyID || !serieID || !subSerieID) {
                    return [2 /*return*/, next(new httpException_1.default('Hacen faltan campos para la creación de la serie', 404))];
                }
                return [4 /*yield*/, trdTipoDoc_1.default.create({
                        dependencyID: dependencyID,
                        serieID: serieID,
                        subSerieID: subSerieID,
                        tipoDocCode: body.tipoDocCode,
                        tipoDocName: body.tipoDocName,
                    })];
            case 1:
                newTipoDoc = _a.sent();
                if (!newTipoDoc) {
                    return [2 /*return*/, next(new httpException_1.default('No se pudo crear la serie, inténtelo nuevamente', 400))];
                }
                return [2 /*return*/, res.status(201).json({
                        status: true,
                        message: "Se cre\u00F3 exitosamente la serie - " + body.tipoDocName,
                        serie: newTipoDoc,
                    })];
        }
    });
}); });
exports.createTipoDoc = createTipoDoc;
