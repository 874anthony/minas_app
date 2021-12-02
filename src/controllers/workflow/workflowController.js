"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
var checkRole = function (req, res, next) {
    var userID = req['user']._id;
    req.query.roles = userID;
    next();
};
exports.checkRole = checkRole;
