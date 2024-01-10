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
exports.validateAuthCode = exports.validateNew = exports.validateLogin = void 0;
const joi_1 = __importDefault(require("joi"));
const User_1 = __importDefault(require("../models/auth/User"));
const validateLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateLogin = joi_1.default.object({
            authCode: joi_1.default.string().required()
        });
        yield validateLogin.validateAsync(req.params);
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateLogin = validateLogin;
const validateNew = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateNew = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            department: joi_1.default.string().required()
        });
        yield validateNew.validateAsync(req.body);
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {},
        });
    }
});
exports.validateNew = validateNew;
const validateAuthCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let authHeader = req.header('Authorization'), accessToken;
        if (authHeader) {
            accessToken = authHeader.split(' ')[1];
        }
        else {
            accessToken = 'none';
        }
        const user = yield User_1.default.findOne({ where: { accessToken } });
        if (!user)
            return res.status(401).json({
                success: false,
                message: 'Unauthorized request'
            });
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateAuthCode = validateAuthCode;
