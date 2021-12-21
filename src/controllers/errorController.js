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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var httpException_1 = __importDefault(require("../utils/httpException"));
var handleCastErrorDB = function (err) {
    var message = "Invalid " + err.path + ": " + err.value + ".";
    return new httpException_1.default(message, 400);
};
var handleDuplicateFieldsDB = function (err) {
    var value = err.message.match(/(["'])(\\?.)*?\1/)[0];
    var message = "Duplicate field value: " + value + ". Please use another value!";
    return new httpException_1.default(message, 400);
};
var handleValidationErrorDB = function (err) {
    var errors = Object.values(err.errors).map(function (el) { return el.message; });
    var message = "Invalid input data: " + errors.join('. ');
    return new httpException_1.default(message, 400);
};
var handleJWTError = function () {
    return new httpException_1.default('Invalid token. Please log in again!', 401);
};
var handleJWTExpiredError = function () {
    return new httpException_1.default('Your token has expired! Please log in again.', 401);
};
var sendErrorDev = function (err, req, res) {
    // A) API
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.status).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
};
var sendErrorProd = function (err, req, res) {
    // A) API
    if (req.originalUrl.startsWith('/api')) {
        // A) Operational, trusted error: send message to client
        if (err.isOperational) {
            return res.status(err.status).json({
                status: err.status,
                message: err.message,
            });
        }
        // B) Programming or other unknown error: don't leak error details
        // 1) Log error
        console.error('ERROR 💥', err);
        // 2) Send generic message
        return res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!',
        });
    }
};
exports.default = (function (err, req, res, next) {
    // console.log(err.stack);
    // err.statusCode = err.statusCode || 500;
    err.status = err.status || 500;
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        var error = __assign({}, err);
        error.message = err.message;
        if (error.kind === 'ObjectId')
            error = handleCastErrorDB(error);
        if (error.code === 11000)
            error = handleDuplicateFieldsDB(error);
        if (error.errors)
            error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError')
            error = handleJWTError();
        if (error.name === 'TokenExpiredError')
            error = handleJWTExpiredError();
        sendErrorProd(error, req, res);
    }
});
