"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
// TODO: Own Imports LATER BE REMOVED
var httpException_1 = __importDefault(require("./utils/httpException"));
var errorController_1 = __importDefault(require("./controllers/errorController"));
// Own routes
var companyRoutes_1 = __importDefault(require("./routes/company/companyRoutes"));
var contractorRoutes_1 = __importDefault(require("./routes/contractors/contractorRoutes"));
var trdRoutes_1 = __importDefault(require("./routes/trd/trdRoutes"));
var authRoutes_1 = __importDefault(require("./routes/auth/authRoutes"));
var userRoutes_1 = __importDefault(require("./routes/users/userRoutes"));
var workflowRoutes_1 = __importDefault(require("./routes/ordinaries/workflowRoutes"));
var eventsRoutes_1 = __importDefault(require("./routes/events/eventsRoutes"));
var ordinariesRoutes_1 = __importDefault(require("./routes/ordinaries/ordinariesRoutes"));
var app = (0, express_1.default)();
// To handle the CORS
app.use((0, cors_1.default)());
// To sanitaze HTTP requests
app.use((0, helmet_1.default)());
//  To recognize the incoming Request Object as a JSON Object.
app.use(express_1.default.json({ limit: '50mb' }));
//  To recognize the incoming Request Object as strings or arrays.
app.use(express_1.default.urlencoded({ extended: true }));
// Getting the logs.
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
// Defining the static files
app.use('/pdf-companies', express_1.default.static(path_1.default.join(__dirname, '../store/documents/company')));
app.use('/pdf-ordinaries', express_1.default.static(path_1.default.join(__dirname, '../store/documents/ordinaries')));
app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");
// Importing routes
app.use('/api/v1/companies', companyRoutes_1.default);
app.use('/api/v1/contractors', contractorRoutes_1.default);
app.use('/api/v1/trd-management', trdRoutes_1.default);
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1/user', userRoutes_1.default);
app.use('/api/v1/workflow', workflowRoutes_1.default);
app.use('/api/v1/events', eventsRoutes_1.default);
app.use('/api/v1/ordinaries', ordinariesRoutes_1.default);
app.all('*', function (req, res, next) {
    next(new httpException_1.default("Can't find " + req.originalUrl + " on this server!", 404));
});
// Using the the global error handler
app.use(errorController_1.default);
exports.default = app;
