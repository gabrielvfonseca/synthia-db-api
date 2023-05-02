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
const fs = require("fs");
const nodemailer = require('nodemailer');
const html = fs.readFileSync('./index.html', 'utf-8');
function SendEmailMessageService() {
    return __awaiter(this, void 0, void 0, function* () {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gabfon.me',
            port: 465,
            secure: true,
            auth: {
                user: 'hello@gabfon.me',
                pass: 'zd@@qGG!n5frRRhs3!n'
            }
        });
        let mailOptions = {
            from: 'hello@gabfon.me',
            to: 'jg.fonseca@outlook.pt',
            subject: 'Test Email',
            html: html,
        };
        let info = yield transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    });
}
exports.default = SendEmailMessageService;
;
//# sourceMappingURL=sendEmailService.js.map