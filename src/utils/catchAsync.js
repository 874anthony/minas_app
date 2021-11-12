"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
});
