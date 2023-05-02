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
exports.grantBetaAccess = exports.blockUserEmail = exports.updateUserEmail = exports.deleteUserByEmailOrID = exports.searchUngrantedUsers = exports.searchGrantedUsers = exports.getUserByEmailOrID = exports.getCollectionInfo = exports.getAllUsers = exports.createUser = void 0;
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
// Mongo
const database_1 = require("../utils/database");
// AWS
// Variables
const db = database_1.client.db('beta');
const collection = db.collection('subscribers');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.params.email;
        const isValidEmail = emailPattern.test(email);
        if (!isValidEmail) {
            return res.status(400).json({
                message: "Invalid email format",
            });
        }
        else {
            const data = yield collection.findOne({ email });
            if (data) {
                return res.status(409).json({
                    message: "Email already exists",
                });
            }
            const user = {
                _id: uuidv4(),
                email,
                active: false,
                restricted: false,
                createdAt: moment().toISOString(),
                updatedAt: moment().toISOString(),
            };
            try {
                yield collection.insertOne(user);
            }
            catch (error) {
                return res.status(500).json({
                    message: "Error while creating user",
                });
            }
            ;
            return res.status(201).json({
                message: "User created successfully",
                data: user,
            });
        }
        ;
    });
}
exports.createUser = createUser;
;
function getAllUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield collection.find({}).toArray();
            if (data.length === 0) {
                return res.status(404).json({
                    message: "No users found",
                });
            }
            else {
                return res.status(200).json({
                    message: "Retrieved all available users",
                    data,
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                message: "Error while fetching users",
            });
        }
    });
}
exports.getAllUsers = getAllUsers;
;
function getCollectionInfo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [users, count, restrictedUsers, activeUsers] = yield Promise.all([
                collection.find().toArray(),
                collection.countDocuments(),
                collection.find({ restricted: { state: true } }).toArray(),
                collection.find({ active: { state: true } }).toArray(),
            ]);
            return res.status(200).json({
                data: {
                    count,
                    users,
                    restrictedUsers,
                    activeUsers,
                },
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Could not get information about the collection",
            });
        }
    });
}
exports.getCollectionInfo = getCollectionInfo;
;
function getUserByEmailOrID(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.params.key;
        const isEmail = emailPattern.test(search);
        try {
            const query = isEmail ? { email: search } : { _id: search };
            const data = yield collection.findOne(query);
            if (data) {
                return res.status(200).json({
                    message: "Retrieved one user",
                    type: isEmail ? "email" : "uuid",
                    data,
                });
            }
            else {
                return res.status(404).json({
                    message: "User not found",
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                message: "Could not get email or id",
            });
        }
    });
}
exports.getUserByEmailOrID = getUserByEmailOrID;
;
function searchGrantedUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const activeUsers = yield collection.find({ active: true }).toArray();
            const count = activeUsers.length;
            if (count > 0) {
                return res.status(200).json({
                    message: "Successfully retrieved active users",
                    count: count,
                    data: activeUsers,
                });
            }
            else {
                return res.status(404).json({
                    message: "No active users found",
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    });
}
exports.searchGrantedUsers = searchGrantedUsers;
;
function searchUngrantedUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ungrantedUsers = yield collection.find({ active: false }).toArray();
            const count = ungrantedUsers.length;
            if (count > 0) {
                return res.status(200).json({
                    message: "Successfully retrieved ungranted users",
                    count: count,
                    data: ungrantedUsers,
                });
            }
            else {
                return res.status(404).json({
                    message: "No ungranted users found",
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    });
}
exports.searchUngrantedUsers = searchUngrantedUsers;
;
function deleteUserByEmailOrID(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.params.key; // :id or :email
        const isEmail = emailPattern.test(search); // true: an email, false: maybe an id
        try {
            const query = isEmail ? { email: search } : { _id: search };
            const data = yield collection.findOne(query);
            if (data) {
                const result = yield collection.deleteOne(query);
                const { deletedCount } = result;
                return res.status(200).json({
                    message: `Successfully deleted ${deletedCount} user`,
                    user: {
                        value: search,
                        type: isEmail ? "email" : "uuid",
                    },
                });
            }
            else {
                return res.status(404).json({
                    message: "User not found",
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    });
}
exports.deleteUserByEmailOrID = deleteUserByEmailOrID;
;
function updateUserEmail(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { currentEmail, newEmail } = req.body;
        if (!currentEmail || !newEmail) {
            return res.status(400).json({
                message: "Missing parameters",
            });
        }
        else {
            try {
                const data = yield collection.updateOne({
                    email: currentEmail
                }, { $set: {
                        email: newEmail,
                        updatedAt: moment().format(),
                    } });
                if (data.modifiedCount === 0) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                }
                else {
                    return res.status(200).json({
                        message: "Email updated successfully",
                        email: {
                            previous: currentEmail,
                            new: newEmail,
                        },
                    });
                }
                ;
            }
            catch (error) {
                console.error(`Error: ${error}`);
                return res.status(500).json({
                    message: "Internal server error",
                });
            }
            ;
        }
        ;
    });
}
exports.updateUserEmail = updateUserEmail;
;
function blockUserEmail(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.params.key; // :id or :email
        const isEmail = emailPattern.test(search); // true: an email, false: maybe an id
        const { message } = req.body;
        if (!search || !message) {
            return res.status(400).json({
                message: "Missing parameters",
            });
        }
        else {
            try {
                const query = isEmail ? { email: search } : { _id: search };
                const data = yield collection.findOne(query);
                if (!data) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                }
                if (data.restricted) {
                    return res.status(200).json({
                        message: "User is already blocked",
                    });
                }
                const restrictions = {
                    state: true,
                    message: message,
                    blockedAt: moment().format(),
                };
                const result = yield collection.updateOne(query, { $set: { restricted: restrictions } });
                return res.status(200).json({
                    message: "User blocked successfully",
                    _id: data._id,
                    email: data.email,
                    reason: restrictions.message,
                    data: result,
                    blockedAt: restrictions.blockedAt,
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Something went wrong while blocking the user",
                });
            }
            ;
        }
        ;
    });
}
exports.blockUserEmail = blockUserEmail;
;
function grantBetaAccess(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.params.key;
        const isEmail = emailPattern.test(search);
        try {
            const query = isEmail ? { email: search } : { _id: search };
            const data = yield collection.findOne(query);
            if (data) {
                if (data.active) {
                    return res.status(404).json({
                        message: "User already has been already promoted to the program",
                    });
                }
                else if (data === null || data === void 0 ? void 0 : data.restricted.state) {
                    return res.status(403).json({
                        message: "User is blocked and cannot be promoted to the beta program",
                    });
                }
                else {
                    yield collection.updateOne(query, { $set: { restricted: {
                                state: true,
                                since: moment().toISOString(),
                            } } });
                    return res.status(200).json({
                        message: "User has been granted access to the beta program",
                        _id: data._id,
                        email: data.email,
                    });
                }
                ;
            }
            else {
                return res.status(404).json({
                    message: "User not found",
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                message: "An error occurred while granting beta access",
            });
        }
    });
}
exports.grantBetaAccess = grantBetaAccess;
;
//# sourceMappingURL=betaController.js.map