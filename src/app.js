"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
// Own routes
var companyRoutes_1 = __importDefault(require("./routes/company/companyRoutes"));
var contractorRoutes_1 = __importDefault(require("./routes/contractors/contractorRoutes"));
var trdRoutes_1 = __importDefault(require("./routes/trd/trdRoutes"));
var authRoutes_1 = __importDefault(require("./routes/auth/authRoutes"));
var userRoutes_1 = __importDefault(require("./routes/users/userRoutes"));
var workflowRoutes_1 = __importDefault(require("./routes/ordinaries/workflowRoutes"));
var ordinariesRoutes_1 = __importDefault(require("./routes/ordinaries/ordinariesRoutes"));
var permanentPersonRoutes_1 = __importDefault(require("./routes/ordinaries/persons/permanentPersonRoutes"));
var punctualworkPersonRoutes_1 = __importDefault(require("./routes/ordinaries/persons/punctualworkPersonRoutes"));
var visitorPersonRoutes_1 = __importDefault(require("./routes/ordinaries/persons/visitorPersonRoutes"));
var specialworkPersonRoutes_1 = __importDefault(require("./routes/ordinaries/persons/specialworkPersonRoutes"));
var visitorlightVehicleRoutes_1 = __importDefault(require("./routes/ordinaries/vehicles/light/visitorlightVehicleRoutes"));
var permanentlightVehicleRoutes_1 = __importDefault(require("./routes/ordinaries/vehicles/light/permanentlightVehicleRoutes"));
var permanentheavyVehicleRoutes_1 = __importDefault(require("./routes/ordinaries/vehicles/heavy/permanentheavyVehicleRoutes"));
var punctuallightVehicleRoutes_1 = __importDefault(require("./routes/ordinaries/vehicles/light/punctuallightVehicleRoutes"));
var punctualheavyVehicleRoutes_1 = __importDefault(require("./routes/ordinaries/vehicles/heavy/punctualheavyVehicleRoutes"));
var specialpunctualheavyVehicleRoutes_1 = __importDefault(require("./routes/ordinaries/vehicles/heavy/specialpunctualheavyVehicleRoutes"));
var app = (0, express_1.default)();
// To handle the CORS
app.use((0, cors_1.default)());
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
app.use('/pdf-contractors', express_1.default.static(path_1.default.join(__dirname, '../store/documents/contractors')));
app.use('/pdf-ordinaries', express_1.default.static(path_1.default.join(__dirname, '../store/documents/ordinaries')));
// Importing routes
app.use('/api/v1/companies', companyRoutes_1.default);
app.use('/api/v1/contractors', contractorRoutes_1.default);
app.use('/api/v1/trd-management', trdRoutes_1.default);
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1/user', userRoutes_1.default);
app.use('/api/v1/workflow', workflowRoutes_1.default);
app.use('/api/v1/ordinaries', ordinariesRoutes_1.default);
app.use('/api/v1/ordinaries-person/permanent-person', permanentPersonRoutes_1.default);
app.use('/api/v1/ordinaries-person/punctual-work-person', punctualworkPersonRoutes_1.default);
app.use('/api/v1/ordinaries-person/visitor-person', visitorPersonRoutes_1.default);
app.use('/api/v1/ordinaries-person/special-work-person', specialworkPersonRoutes_1.default);
// Vehicle starts here
app.use('/api/v1/ordinaries-vehicle/visitor-vehicle', visitorlightVehicleRoutes_1.default);
app.use('/api/v1/ordinaries-vehicle/permanent-light-vehicle', permanentlightVehicleRoutes_1.default);
app.use('/api/v1/ordinaries-vehicle/permanent-heavy-vehicle', permanentheavyVehicleRoutes_1.default);
app.use('/api/v1/ordinaries-vehicle/punctual-light-vehicle', punctuallightVehicleRoutes_1.default);
app.use('/api/v1/ordinaries-vehicle/punctual-heavy-vehicle', punctualheavyVehicleRoutes_1.default);
app.use('/api/v1/ordinaries-vehicle/special-punctual-heavy-vehicle', specialpunctualheavyVehicleRoutes_1.default);
// Define the global error handler to pass next errors
function globalErrorHandler(err, req, res, next) {
    var status = err.status || 500;
    var message = err.message || 'Something went wrong';
    return res.status(status).json({
        error: err,
        status: status,
        message: message,
        stack: err.stack,
    });
}
// Using the the global error handler
app.use(globalErrorHandler);
exports.default = app;
