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
exports.findOne = exports.findAll = exports.createOne = void 0;
// Importing the global handler error and the catchAsync
var httpException_1 = __importDefault(require("../utils/httpException"));
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
var apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
var createOne = function (Model) {
    return (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var body, document;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = req.body;
                    if (!body) {
                        return [2 /*return*/, next(new httpException_1.default('Hacen faltan campos para la creación del documento', 404))];
                    }
                    return [4 /*yield*/, Model.create(body)];
                case 1:
                    document = _a.sent();
                    if (!document) {
                        return [2 /*return*/, next(new httpException_1.default('No se pudo crear el documento, inténtelo nuevamente', 400))];
                    }
                    return [2 /*return*/, res.status(201).json({
                            status: true,
                            message: "Se cre\u00F3 el documento exitosamente!",
                            document: document,
                        })];
            }
        });
    }); });
};
exports.createOne = createOne;
var findAll = function (Model) {
    return (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var features, documents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    features = new apiFeatures_1.default(Model.find(), req.query)
                        .filter()
                        .sort()
                        .limitFields()
                        .paginate();
                    return [4 /*yield*/, features.query];
                case 1:
                    documents = _a.sent();
                    if (documents.length === 0) {
                        return [2 /*return*/, next(new httpException_1.default('No hay documentos con ese criterio de búsqueda!', 204))];
                    }
                    return [2 /*return*/, res.status(200).json({
                            status: true,
                            data: {
                                documents: documents,
                            },
                        })];
            }
        });
    }); });
};
exports.findAll = findAll;
/**
 * Obtener empresa por el ID;
 * @param id
 */
var findOne = function (Model, populateOptions) {
    return (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, query, document;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    query = Model.findById(id);
                    if (populateOptions)
                        query = query.populate(populateOptions);
                    return [4 /*yield*/, query];
                case 1:
                    document = _a.sent();
                    if (!document) {
                        return [2 /*return*/, next(new httpException_1.default('No hay un documento con este ID', 404))];
                    }
                    return [2 /*return*/, res.status(200).json({
                            status: true,
                            document: document,
                        })];
            }
        });
    }); });
};
exports.findOne = findOne;
