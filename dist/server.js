"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// Config
const { server } = require('./config');
// Create server
app_1.default.listen(server.port, () => {
    console.log(`⚡️ [server]: Server is running at http://localhost:${server.port}`);
    console.log(`🎉 [server]: Ready to handle and perform requests`);
});
//# sourceMappingURL=server.js.map