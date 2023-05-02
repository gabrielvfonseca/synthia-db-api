"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
// Mongo
const database_1 = require("../database");
function saveApiLogs(res, req, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            _id: uuidv4(),
            route: req.originalUrl,
            requestType: req.method,
            statusCode: req.statusCode,
            metadata: {
                ipAddress: req.ip,
                userAgent: req.get('User-Agent'),
            },
            timestamp: moment().format(),
        };
        try {
            yield database_1.client.db("admin").collection("logs").insertOne(data);
        }
        catch (err) {
            console.log('🪵 [logs]: Error saving request log');
        }
        finally {
            next();
        }
        ;
    });
}
exports.default = saveApiLogs;
;
//# sourceMappingURL=saveLogs.js.map