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
// Mongo
const database_1 = require("../utils/database");
// Variables
const db = database_1.client.db('admin');
const collection = db.collection('users');
function isAnAdminAuth(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const secretToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const apiKey = req.headers['x-api-key'];
        console.log(secretToken);
        console.log("===========================");
        console.log(apiKey);
        if (!secretToken || !apiKey) {
            return res.status(401).json({
                message: 'Unauthorized: Missing api credentials'
            });
        }
        else {
            try {
                const data = yield collection.findOne({ key_token: apiKey, secret_token: secretToken });
                if (!data) {
                    return res.status(401).json({
                        message: 'Unauthorized: Invalid api credentials'
                    });
                }
                ;
                if (data.role !== 'admin') {
                    return res.status(403).json({
                        message: 'Forbidden: User does not have enough permissions',
                        data: {
                            _id: data._id,
                            description: data.description,
                            role: data.role,
                        }
                    });
                }
                else {
                    next();
                }
                ;
            }
            catch (err) {
                return res.status(500).json({
                    message: 'Internal Server Error validating user credentials',
                });
            }
        }
        ;
    });
}
exports.default = isAnAdminAuth;
;
//# sourceMappingURL=isAdminUser.js.map