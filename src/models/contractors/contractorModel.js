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
var mongoose_1 = require("mongoose");
var validator_1 = __importDefault(require("validator"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var crypto_js_1 = __importDefault(require("crypto-js"));
var crypto_1 = __importDefault(require("crypto"));
var companyModel_1 = require("../companies/companyModel");
var ordinariesEnum_1 = require("../../interfaces/ordinaries/ordinariesEnum");
// Definying the schema
var ContractorSchema = new mongoose_1.Schema({
    businessName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    nit: {
        type: String,
        unique: true,
        required: true,
        min: 7,
    },
    email: {
        type: String,
        validate: {
            validator: function (value) { return validator_1.default.isEmail(value); },
            message: 'El email ingresado no es v??lidad',
        },
        lowercase: true,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    legalRepresentative: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    },
    docComCam: {
        type: String,
    },
    docRUT: {
        type: String,
    },
    docLegalRepresentativeID: {
        type: String,
    },
    radicado: {
        type: String,
    },
    status: {
        type: String,
        enum: [companyModel_1.StatusCompany],
        default: companyModel_1.StatusCompany.Pending,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
    },
    docSocialSecurity: {
        type: [Map],
        of: String,
    },
    finishDates: Date,
    docSocialSecurityAt: Date,
    observations: [
        {
            type: String,
            trim: true,
            minlength: [5, 'Las observaciones deben tener al menos 5 letras'],
        },
    ],
    companyID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'company',
        required: true,
    },
});
ContractorSchema.plugin(mongoose_unique_validator_1.default, {
    message: 'El {PATH} prove??do ya se encuentra registrado.',
});
// ================================================== PRE METHODS STARTS HERE ==================================================
// ContractorSchema.pre(/^find/, function (next) {
// 	this.populate({
// 		path: 'company',
// 		select: 'businessName nit email address phone legalRepresentative',
// 	});
// 	next();
// });
// UserSchema.methods.toJSON = function() {
// var obj = this.toObject()
// delete obj.passwordHash
// return obj
// }
// ================================================== STATIC METHODS STARTS HERE ==================================================
/**
 *
 * @param genPassword
 * @returns An automatic generated passwords
 */
ContractorSchema.methods.hashPassword = function (genPassword) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, crypto_js_1.default.AES.encrypt(genPassword, process.env.PASSWORD_PHARAPRHASE).toString()];
        });
    });
};
ContractorSchema.methods.generatePassword = function (length, wishlist) {
    if (length === void 0) { length = 10; }
    if (wishlist === void 0) { wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, Array.from(crypto_1.default.randomFillSync(new Uint32Array(length)))
                    .map(function (x) { return wishlist[x % wishlist.length]; })
                    .join('')];
        });
    });
};
ContractorSchema.methods.decryptPassword = function (hashedPassword) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, crypto_js_1.default.AES.decrypt(hashedPassword, process.env.PASSWORD_PHARAPRHASE).toString(crypto_js_1.default.enc.Utf8)];
        });
    });
};
ContractorSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var idContractor_1;
        var _this = this;
        return __generator(this, function (_a) {
            if (this.isModified('status') && this.status === 'REVISION') {
                idContractor_1 = this._id;
                Object.values(ordinariesEnum_1.ModelsOrdinary).forEach(function (Model) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Model.updateMany({
                                    $match: {
                                        $and: [{ contractorID: idContractor_1 }, { status: 'ACTIVO' }],
                                    },
                                }, {
                                    $set: { status: 'INACTIVO' },
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            next();
            return [2 /*return*/];
        });
    });
});
exports.default = (0, mongoose_1.model)('contractor', ContractorSchema);
