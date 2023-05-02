"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
// Defined Routes
const IndexRoute = require('./routes/index');
const betaRoute = require('./routes/index.beta');
const adminRoute = require('./routes/index.admin');
// Import middlewares
//import saveApiLogs from "./middleware/saveLogs";
// Create Express app
const app = (0, express_1.default)();
// Middleware
//app.use(saveApiLogs);
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Routes
app.use("/beta", betaRoute);
app.use("/admin", adminRoute);
app.use(IndexRoute);
// 404 Error handler
app.use((next) => {
    const error = new Error('Not Found');
    next(error);
});
// 500 Error handler
app.use((err, res) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message,
            status: err.status || 500,
        },
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map