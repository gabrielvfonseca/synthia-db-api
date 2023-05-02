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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const database_1 = require("../database");
const getUserIdFromTokens = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const refreshToken = req.headers['x-refresh-token'];
        if (!accessToken || !refreshToken) {
            return res.status(401).json({ message: 'Access token or refresh token missing' });
        }
        const decodedAccessToken = jsonwebtoken_1.default.verify(accessToken, config_1.auth.jwt.secret);
        const decodedRefreshToken = jsonwebtoken_1.default.verify(refreshToken, config_1.auth.jwt.secret);
        if (decodedAccessToken !== decodedRefreshToken) {
            return res.status(401).json({ message: 'Access token and refresh token do not match' });
        }
        const user = yield database_1.client.db("admin").collection("users").find({ accessToken: accessToken, refreshToken: refreshToken });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        ;
        console.log(user);
        // Call the next middleware function
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid tokens' });
    }
});
exports.getUserIdFromTokens = getUserIdFromTokens;
//# sourceMappingURL=userIdFromTokens.js.map