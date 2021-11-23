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
exports.UserRoles = void 0;
var mongoose_1 = require("mongoose");
var validator_1 = __importDefault(require("validator"));
var crypto_js_1 = __importDefault(require("crypto-js"));
var UserRoles;
(function (UserRoles) {
    UserRoles["AccessControl"] = "Control de Acceso";
    UserRoles["RSE"] = "Responsabilidad Social Empresarial";
    UserRoles["SSFF"] = "Seguridad F\u00EDsica";
    UserRoles["SISO"] = "Seguridad y Salud en el Trabajo";
    UserRoles["Auditing"] = "Interventor\u00EDa";
    UserRoles["SMIN"] = "Gerencia Servicios Mineros";
    UserRoles["Admin"] = "Administrador";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
var UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
    },
    surname: {
        type: String,
        minlength: 1,
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: Object.values(UserRoles),
            message: 'El rol debe ser alguno de los predeterminados por Servicios Mineros',
        },
    },
    email: {
        type: String,
        validate: {
            validator: function (value) { return validator_1.default.isEmail(value); },
            message: 'El email ingresado no es válido',
        },
        lowercase: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Por favor, confirma tu contraseña'],
        // ONLY WORKS ON .create() and .save();
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: 'Las contraseñas no coinciden',
        },
    },
    status: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
    },
});
// ============================================= DOCUMENT MIDDLEWARE STARTS HERE==============================================
// To hash the password everytime it changes
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Only run this function if password was actually modified
                    if (!this.isModified('password'))
                        return [2 /*return*/, next()];
                    // Hash the password with cost of 12
                    _a = this;
                    return [4 /*yield*/, crypto_js_1.default.AES.encrypt(this.password, process.env.PASSWORD_PHARAPRHASE).toString()];
                case 1:
                    // Hash the password with cost of 12
                    _a.password = _b.sent();
                    // Delete passwordConfirm field
                    this.passwordConfirm = undefined;
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
// ================================================== STATICS METHODS STARTS HERE ==========================================
/**
 *
 * @param hashedPassword
 * @returns Decrypt hashed password
 */
UserSchema.methods.decryptPassword = function (hashedPassword) {
    return __awaiter(this, void 0, void 0, function () {
        var passwordDecrypted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, crypto_js_1.default.AES.decrypt(hashedPassword, process.env.PASSWORD_PHARAPRHASE).toString(crypto_js_1.default.enc.Utf8)];
                case 1:
                    passwordDecrypted = _a.sent();
                    return [2 /*return*/, passwordDecrypted];
            }
        });
    });
};
exports.default = (0, mongoose_1.model)('user', UserSchema);
