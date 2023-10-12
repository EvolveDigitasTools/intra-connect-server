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
exports.login = void 0;
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWTKEY = process.env.JWTKEY || "MYNAME-IS-HELLOWORLD";
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authCode } = req.params;
        const response = yield axios_1.default.post('https://accounts.zoho.com/oauth/v2/token', null, {
            params: {
                code: authCode,
                redirect_uri: process.env.AUTH_REDIRECT_URL,
                client_id: process.env.AUTH_CLIENT_ID,
                client_secret: process.env.AUTH_CLIENT_SECRET,
                grant_type: 'authorization_code',
            }
        });
        const userInfo = jsonwebtoken_1.default.decode(response.data.id_token);
        const token = jsonwebtoken_1.default.sign({ email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email }, JWTKEY);
        console.log(response.data, userInfo, token, process.env.AUTH_REDIRECT_URL);
        return res.status(201).json({
            success: true,
            message: `Login success`,
            data: {
                token,
                user: {
                    "gender": userInfo.gender,
                    "last_name": userInfo.last_name,
                    "picture": userInfo.picture,
                    "name": userInfo.name,
                    "first_name": userInfo.first_name,
                    "email": userInfo.email,
                }
            },
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "auth.controller.js -> login"
            },
        });
    }
});
exports.login = login;
