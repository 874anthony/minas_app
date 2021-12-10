"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.months = exports.getLocalDate = exports.addDate = void 0;
function addDate(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
exports.addDate = addDate;
function getLocalDate(date) {
    return date.toLocaleString();
}
exports.getLocalDate = getLocalDate;
var months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
];
exports.months = months;
