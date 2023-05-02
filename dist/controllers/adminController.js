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
exports.deleteUser = exports.createUser = void 0;
const uuid_1 = require("uuid");
const moment_1 = __importDefault(require("moment"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
// Mongo
const database_1 = require("../utils/database");
// Variables
const db = database_1.client.db('admin');
const collection = db.collection('users');
const shuffleWord = (word) => {
    // Convert the word to an array of characters
    const characters = word.split('');
    // Shuffle the array
    for (let i = characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
    }
    // Join the characters back into a string
    const shuffledWord = characters.join('');
    return shuffledWord;
};
const generateAccessToken = (role) => {
    const payload = { sub: shuffleWord(config_1.auth.jwt.secret), role: role };
    return jsonwebtoken_1.default.sign(payload, shuffleWord(config_1.auth.jwt.secret));
};
const generateSecretToken = (role) => {
    const payload = { sub: shuffleWord(config_1.auth.jwt.secret), role: role };
    return jsonwebtoken_1.default.sign(payload, shuffleWord(config_1.auth.jwt.secret));
};
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { description, role } = req.body;
        const data = {
            _id: (0, uuid_1.v4)(),
            description: description,
            key_token: generateAccessToken(role || 'guest'),
            secret_token: generateSecretToken(role || 'guest'),
            role: role || 'guest',
            createdAt: (0, moment_1.default)().format(),
        };
        try {
            yield collection.insertOne(data);
            return res.status(201).json({
                message: "User created successfuly",
                data: {
                    _id: data._id,
                    key_token: data.key_token,
                    secret_token: data.secret_token,
                    role: data.role,
                }
            });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Failed to create user',
            });
        }
        ;
    });
}
exports.createUser = createUser;
;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id, key, secret } = req.body;
        const params = { _id: _id, key_token: key, secret_token: secret };
        try {
            const user = yield collection.findOne(params);
            if (user) {
                yield collection.deleteOne(params);
                return res.status(200).json({
                    message: "Deleted user successfuly",
                    data: {
                        _id: _id,
                        key: key,
                        secret: secret,
                    },
                });
            }
            else {
                return res.status(409).send({
                    message: "User doesn't exist",
                });
            }
            ;
        }
        catch (err) {
            return res.status(500).json({
                message: 'Failed to create user',
            });
        }
        ;
    });
}
exports.deleteUser = deleteUser;
;
//# sourceMappingURL=adminController.js.map