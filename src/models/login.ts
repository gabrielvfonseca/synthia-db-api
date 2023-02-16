// src/modals/user.ts

/* MongoDB */
import { ObjectId } from "mongodb";

export class VerificationTokens {
    constructor (
        public userId: ObjectId,
        public token: string,
        public expiresAt: Date, // 86400s or 24hours
        public createdAt: Date,
        public updatedAt: Date,

        public id?: ObjectId,
    ) {}
};

export class PwdResetRequests {
    constructor (
        public userId: ObjectId,
        public token: string,
        public expiresAt: Date,
        public createdAt: Date,
        public updatedAt: Date,

        public id?: ObjectId,
    ) {}
};

export class LoginLogs {
    constructor (
        public userId: ObjectId,
        public ipAddress: string,
        public timestamp: Date,

        public id?: ObjectId,
    ) {}
};


export class EarlyAccess {
    constructor (
        public userId: ObjectId,
        public createdAt: Date,
        public updateAt: Date,

        public id?: ObjectId
    ) {}
};


export class User {
    constructor (
        public name: string,
        public email: string,
        public emailVerified: boolean,
        public password: string, // password encryption
        public loginMethod: 'github' | 'email',
        public twoFactorSecret: {
            active: boolean,
            secretKey: string,
        },
        public createdAt: Date,
        public updateAt: Date,

        public id?: ObjectId,
    ) {}
};