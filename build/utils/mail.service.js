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
exports.sendMailSetup = exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// import jwt from "jsonwebtoken";
const emailConfig_1 = require("../config/emailConfig");
const { MAIL_HOST, MAIL_PORT, MAIL_EMAIL, MAIL_PASS, FRONTEND_BASE_URL } = process.env;
const sendMail = (email, mailOptions, attachment) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let transport = nodemailer_1.default.createTransport({
            host: MAIL_HOST,
            port: Number(MAIL_PORT) | 0,
            secure: true,
            auth: {
                user: MAIL_EMAIL,
                pass: MAIL_PASS
            }
        });
        const attachments = [];
        if (attachment)
            attachments.push({
                filename: attachment === null || attachment === void 0 ? void 0 : attachment.fileName,
                content: attachment === null || attachment === void 0 ? void 0 : attachment.fileContent,
            });
        const mailOption = {
            from: MAIL_EMAIL,
            to: email,
            subject: mailOptions.subject,
            priority: mailOptions.priority,
            html: `<!DOCTYPE html>
            <html>
            <head>
                <title>${mailOptions.title}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 5px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #333333;
                    }
                    p {
                        color: #555555;
                        white-space: pre-wrap;
                    }
                    a {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 3px;
                    }
                    .footer {
                        margin-top: 20px;
                        text-align: center;
                        color: #999999;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>${mailOptions.title}</h1>
                    <p>Dear User,</p>
                    <p>${mailOptions.message}</p>
                    <p><a href="${FRONTEND_BASE_URL}/${mailOptions.actionRoute}">${mailOptions.actionText}</a></p>               
                    <p>${mailOptions.closingMessage ? mailOptions.closingMessage : ""}</p>
                </div>
                <div class="footer">
                    <p>Best regards,<br>Global Plugin</p>
                </div>
            </body>
            </html>`,
            attachments
        };
        return yield transport.sendMail(mailOption);
    }
    catch (error) {
        console.log(error.message);
        return false;
    }
});
exports.sendMail = sendMail;
const sendMailSetup = (type, sendTo = null, variables = {}) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const mailOptions = {
        subject: emailConfig_1.mailDetails[type].subject,
        title: (_a = getMessage(emailConfig_1.mailDetails[type].title, variables)) !== null && _a !== void 0 ? _a : "",
        message: (_b = getMessage(emailConfig_1.mailDetails[type].message, variables)) !== null && _b !== void 0 ? _b : "",
        closingMessage: emailConfig_1.mailDetails[type].closingMessage,
        priority: emailConfig_1.mailDetails[type].priority,
        actionRoute: getMessage(emailConfig_1.mailDetails[type].actionRoute, variables),
        actionText: emailConfig_1.mailDetails[type].actionText
    };
    if (sendTo)
        return yield (0, exports.sendMail)(sendTo, mailOptions);
    else if (emailConfig_1.mailDetails[type].sendTo)
        return yield (0, exports.sendMail)(emailConfig_1.mailDetails[type].sendTo || "", mailOptions);
    else
        return false;
});
exports.sendMailSetup = sendMailSetup;
const getMessage = (message, variables) => {
    if (!message)
        return message;
    if (variables) {
        Object.entries(variables).forEach(([key, value]) => {
            message = message === null || message === void 0 ? void 0 : message.replace(`$${key}`, String(value));
        });
    }
    return message;
};
// const getToken = (vendorCode: string | null, type: string): string | null => {
//     if (vendorCode)
//         return jwt.sign({ vendorCode, type }, JWTKEY);
//     else
//         return null;
// }
