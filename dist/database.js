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
exports.close = exports.connect = exports.client = void 0;
const { MongoClient } = require("mongodb");
// Config
const { mongo } = require("./config");
// Mongo
exports.client = new MongoClient(mongo.uri, { useNewUrlParser: true });
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.client.connect();
            console.log('🌲 [mongodb]: Connected successfully to database');
            return exports.client;
        }
        catch (err) {
            console.log('👀 [mongodb]: Unable to connect to MongoDB');
            process.exit(1);
        }
    });
}
exports.connect = connect;
;
function close() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.client.close();
            console.log('🔌 [mongodb]: Disconnected from MongoDB!');
        }
        catch (err) {
            console.log(`⚠️ [mongodb]: Error disconnecting from MongoDB: ${err}`);
        }
    });
}
exports.close = close;
;
connect().then().catch(console.error);
//# sourceMappingURL=database.js.map