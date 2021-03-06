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
exports.getSubseriesBySerieDep = exports.updateSubserie = exports.getSubserie = exports.getAllSubseries = exports.createSubSerie = void 0;
// Importing our models
var trdSubSerie_1 = __importDefault(require("../../models/trd/trdSubSerie"));
// Importing the factory
var handlerFactory_1 = require("../handlerFactory");
// Importing the global handler error and the catchAsync
var httpException_1 = __importDefault(require("../../utils/httpException"));
var catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
var apiFeatures_1 = __importDefault(require("../../utils/apiFeatures"));
var getSubseriesBySerieDep = function (req, res, next) {
    req.query.dependencyID = req.params.idDependency;
    req.query.serieID = req.params.idSerie;
    next();
};
exports.getSubseriesBySerieDep = getSubseriesBySerieDep;
var createSubSerie = (0, handlerFactory_1.createOne)(trdSubSerie_1.default);
exports.createSubSerie = createSubSerie;
var getAllSubseries = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var features, subseries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                features = new apiFeatures_1.default(trdSubSerie_1.default.find(), req.query)
                    .filter()
                    .sort()
                    .limitFields()
                    .paginate();
                return [4 /*yield*/, features.query.populate([
                        {
                            path: 'dependencyID',
                            select: 'dependencyCode dependencyName status',
                        },
                        {
                            path: 'serieID',
                            select: 'serieCode serieName status',
                        },
                    ])];
            case 1:
                subseries = _a.sent();
                if (subseries.length === 0) {
                    return [2 /*return*/, next(new httpException_1.default('No hay documentos con ese criterio de b??squeda!', 204))];
                }
                return [2 /*return*/, res.status(200).json({
                        status: true,
                        subseries: subseries,
                    })];
        }
    });
}); });
exports.getAllSubseries = getAllSubseries;
var getSubserie = (0, handlerFactory_1.findOne)(trdSubSerie_1.default);
exports.getSubserie = getSubserie;
var updateSubserie = (0, handlerFactory_1.updateOne)(trdSubSerie_1.default);
exports.updateSubserie = updateSubserie;
