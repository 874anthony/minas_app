"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadOrdinaryVehicle = exports.uploadOrdinaryPerson = void 0;
var httpException_1 = __importDefault(require("../utils/httpException"));
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
// ================================== MULTER CONFIGURATION TO HANDLE THE DOCUMENTS ===========================================
// Configuring first the type of the storage
var multerStorageOrdinary = multer_1.default.diskStorage({
    // Define the destination
    destination: function (req, file, callback) {
        var predicate;
        if (req.body.citizenship === undefined) {
            predicate = req['ordCitizenship'];
        }
        else {
            predicate = req.body.citizenship;
        }
        var directory = "store/documents/ordinaries/person/" + predicate;
        if (!fs_1.default.existsSync(directory)) {
            fs_1.default.mkdirSync(directory, { recursive: true });
        }
        callback(null, directory);
    },
    filename: function (req, file, callback) {
        var predicate;
        if (req.body.citizenship === undefined) {
            predicate = req['ordCitizenship'];
        }
        else {
            predicate = req.body.citizenship;
        }
        // Extracting the extension.
        var extension = file.mimetype.split('/')[1];
        callback(null, "ordinary-" + predicate + "-" + Date.now() + "." + extension);
    },
});
// Filtering for only PDF files
var multerFilterOrdinary = function (req, file, callback) {
    if (file.mimetype.split('/')[1] === 'pdf') {
        callback(null, true);
    }
    else {
        callback(new httpException_1.default('No es un pdf, por favor, solo suba archivos PDF', 404), false);
    }
};
// ======================================= VEHICLE MULTER STARTS HERE ===========================================
// Configuring first the type of the storage
var multerStorageVehicle = multer_1.default.diskStorage({
    // Define the destination
    destination: function (req, file, callback) {
        var predicate;
        if (req.body.vehicleNumber === undefined) {
            predicate = req['ordVehicleNumber'];
        }
        else {
            predicate = req.body.vehicleNumber;
        }
        var directory = "store/documents/ordinaries/vehicle/" + predicate;
        if (!fs_1.default.existsSync(directory)) {
            fs_1.default.mkdirSync(directory, { recursive: true });
        }
        callback(null, directory);
    },
    filename: function (req, file, callback) {
        var predicate;
        if (req.body.vehicleNumber === undefined) {
            predicate = req['ordVehicleNumber'];
        }
        else {
            predicate = req.body.vehicleNumber;
        }
        // Extracting the extension.
        var extension = file.mimetype.split('/')[1];
        callback(null, "ordinary-" + predicate + "-" + Date.now() + "." + extension);
    },
});
// Filtering for only PDF files
var multerFilterVehicle = function (req, file, callback) {
    if (file.mimetype.split('/')[1] === 'pdf') {
        callback(null, true);
    }
    else {
        callback(new httpException_1.default('No es un pdf, por favor, solo suba archivos PDF', 404), false);
    }
};
// ConfigMulter
var uploadOrdinaryPerson = (0, multer_1.default)({
    storage: multerStorageOrdinary,
    fileFilter: multerFilterOrdinary,
});
exports.uploadOrdinaryPerson = uploadOrdinaryPerson;
var uploadOrdinaryVehicle = (0, multer_1.default)({
    storage: multerStorageVehicle,
    fileFilter: multerFilterVehicle,
});
exports.uploadOrdinaryVehicle = uploadOrdinaryVehicle;
