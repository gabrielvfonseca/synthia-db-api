"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.server = exports.ses = exports.mongo = void 0;
const aws_sdk_1 = require("aws-sdk");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// Env. variables
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
exports.mongo = {
    user: user,
    port: 27017,
    uri: process.env.MONGO_URI || `mongodb+srv://${user}:${password}@cluster.ley27f6.mongodb.net/test`,
};
exports.ses = new aws_sdk_1.SES({
    accessKeyId: '<your-access-key-id>',
    secretAccessKey: '<your-secret-access-key>',
    region: '<your-region>',
});
exports.server = {
    port: process.env.NODE_PORT || 8000,
};
exports.auth = {
    jwt: {
        secret: 'mysecretkey',
        options: {
            accessExpiresIn: '7d',
            refreshExpiresIn: '15m'
        }
    }
};
//# sourceMappingURL=config.js.map