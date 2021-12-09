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
exports.isAllowedOrdinary = exports.guardLogin = exports.loginUsers = exports.login = exports.createUserRole = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Importing our utils to this controller
var httpException_1 = __importDefault(require("../../utils/httpException"));
var catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
// Importing own models
var userModel_1 = __importStar(require("../../models/users/userModel"));
var ordinariesEnum_1 = require("../../interfaces/ordinaries/ordinariesEnum");
var signToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
var isAllowedOrdinary = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, ordinaryType, currentOrdinary, ejsOpts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.headers.ordinarytype)
                    return [2 /*return*/, next(new httpException_1.default('No ha proporcinado el tipo de ordinario, intente nuevamente', 404))];
                id = req.params.id;
                ordinaryType = req.headers.ordinarytype;
                return [4 /*yield*/, ordinariesEnum_1.ModelsOrdinary[ordinaryType].findById(id)];
            case 1:
                currentOrdinary = _a.sent();
                ejsOpts = {
                    status: "<li style=\"color: " + (currentOrdinary.status === 'INACTIVO' ? 'red' : 'green') + ";\"> " + currentOrdinary.status + " </li>",
                    name: "" + (currentOrdinary.name !== undefined
                        ? currentOrdinary.name
                        : currentOrdinary.vehicleNumber),
                    ordType: "" + ordinariesEnum_1.getModelByType[ordinaryType],
                    observations: currentOrdinary.observations,
                };
                res.render(__dirname + "/../../views/pages/qrcode.ejs", ejsOpts);
                return [2 /*return*/];
        }
    });
}); });
exports.isAllowedOrdinary = isAllowedOrdinary;
var createUserRole = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, excludedField, newUser, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = __assign({}, req.body);
                excludedField = userModel_1.UserRoles.Admin;
                // Check if they put 'Admin' in the request.body
                if (Object.values(body).includes(excludedField)) {
                    return [2 /*return*/, next(new httpException_1.default('No se puede crear usuarios administradores, intente nuevamente', 404))];
                }
                return [4 /*yield*/, userModel_1.default.create(body)];
            case 1:
                newUser = _a.sent();
                token = signToken(newUser._id);
                // Hide password from the output
                newUser.password = undefined;
                res.status(200).json({
                    status: true,
                    message: "El usuario con el rol: " + body.role + " fue creado con exito",
                    token: token,
                    user: newUser,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.createUserRole = createUserRole;
var login = function (Model) {
    return (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, user, _b, token;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    // 1) Check if email and password exist
                    if (!email || !password) {
                        return [2 /*return*/, next(new httpException_1.default('Por favor ingresa el email y la contraseña!', 400))];
                    }
                    return [4 /*yield*/, Model.findOne({ email: email }).select('+password')];
                case 1:
                    user = _c.sent();
                    _b = !user;
                    if (_b) return [3 /*break*/, 3];
                    return [4 /*yield*/, user.decryptPassword(user.password)];
                case 2:
                    _b = !((_c.sent()) === password);
                    _c.label = 3;
                case 3:
                    if (_b) {
                        return [2 /*return*/, next(new httpException_1.default('Email o contraseña incorrectos!', 401))];
                    }
                    token = signToken(user._id);
                    res.status(200).json({
                        status: true,
                        message: 'Te has conectado con éxito',
                        id: user._id,
                        roleType: user.role,
                        token: token,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.login = login;
var guardLogin = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, id, currentUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.headers.authorization &&
                    req.headers.authorization.startsWith('Bearer')) {
                    token = req.headers.authorization.split(' ')[1];
                }
                if (!token) {
                    return [2 /*return*/, next(new httpException_1.default('No has iniciado sesión, por favor hazlo e intenta nuevamente', 401))];
                }
                jsonwebtoken_1.default.verify(token, process.env.JWT_PRIVATE_KEY, function (err, decoded) {
                    id = decoded.id;
                });
                return [4 /*yield*/, userModel_1.default.findById(id)];
            case 1:
                currentUser = _a.sent();
                if (!currentUser) {
                    return [2 /*return*/, next(new httpException_1.default('El usuario con este token ya no existe!', 401))];
                }
                req['user'] = currentUser;
                next();
                return [2 /*return*/];
        }
    });
}); });
exports.guardLogin = guardLogin;
var loginUsers = login(userModel_1.default);
exports.loginUsers = loginUsers;
