"use strict";
// Verifica se o utilizador que está a tentar fazer alterações é um utilizador admin
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
const database_1 = require("../database");
// Variables
const db = database_1.client.db('admin');
const collection = db.collection('users');
function adminAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const secretToken = req.headers.authorization.split(' ')[1]; // Extract the token from the "Authorization" header
        const apiKey = req.headers['x-api-key']; // Extract the API key from the "X-Api-Key" header
        if (secretToken && apiKey) {
            try {
                const result = yield collection.findOne({ key_token: apiKey, secret_token: secretToken });
                if ((result === null || result === void 0 ? void 0 : result.role) !== 'admin')
                    return res.status(500).json({
                        message: 'User does not have enough permissions',
                        data: {
                            _id: result._id,
                            description: result.description,
                            role: result.role,
                        }
                    });
                next();
            }
            catch (err) {
                return res.status(500).json({
                    message: 'Error validating user credentials',
                });
            }
            ;
        }
        else {
            return res.status(500).json({
                message: 'Missing api credentials',
            });
        }
    });
}
exports.default = adminAuth;
;
//# sourceMappingURL=isAdminUser%20copy.js.map