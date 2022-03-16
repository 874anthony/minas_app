"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing dependencies
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var app_1 = __importDefault(require("./app"));
// Import enviroment variables and parsing into the single process.env
dotenv_1.default.config({ path: './config.env' });
var username = process.env.MONGODB_USERNAME;
var password = process.env.MONGODB_PASSWORD;
var DB = process.env.DATABASE_URI
    .replace('<username>', username)
    .replace('<password>', password);
// Connecting to the DB itself
mongoose_1.default
    .connect(DB, { dbName: 'minas_gecelca' })
    .then(function () { return console.log('DB connected succesfully!'); })
    .catch(console.log);
var port = process.env.PORT || 3000;
app_1.default.listen(port, function () {
    console.log("Server inizialited, app is running on ".concat(port));
});
