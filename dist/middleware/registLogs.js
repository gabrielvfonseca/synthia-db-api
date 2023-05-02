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
// Variables
const db = database_1.client.db('admin');
const collection = db.collection('logs');
function saveApiLogs(user, route, requestType, statusCode, metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            _id: uuidv4(),
            user: '',
            route: '',
            requestType: '',
            statusCode: 200,
            metadata: '',
            createdAt: moment().format(),
        };
        try {
            yield collection.insertOne(data);
        }
        catch (err) {
            console.log('🪵 [logs]: Error saving request log');
        }
    });
}
exports.default = saveApiLogs;
//# sourceMappingURL=registLogs.js.map