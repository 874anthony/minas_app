"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing dependencies
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
// Import enviroment variables and parsing into the single process.env
dotenv_1.default.config({ path: './config.env' });
var app_1 = __importDefault(require("./app"));
// Creating the DB instance
var DB = process.env.DATABASE_URI.replace('<password>', process.env.MONGODB_PASSWORD);
// Connecting to the DB itself
// TODO: Handle errors
mongoose_1.default
    .connect(DB, { dbName: 'minas_gecelca' })
    .then(function () { return console.log('DB connected succesfully!'); });
var port = process.env.PORT || 3000;
app_1.default.listen(port, function () {
    console.log("Server inizialited, app is running on " + port);
});
