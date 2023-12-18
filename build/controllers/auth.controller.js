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
exports.getAssignees = exports.newEmployee = exports.logout = exports.login = void 0;
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Department_1 = __importDefault(require("../models/auth/Department"));
const User_1 = __importDefault(require("../models/auth/User"));
const UserDepartment_1 = __importDefault(require("../models/auth/UserDepartment"));
const sequelize_1 = require("sequelize");
const JWTKEY = process.env.JWTKEY || "MYNAME-IS-HELLOWORLD";
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authCode } = req.params;
        console.log(authCode, 'authcode');
        let response = yield axios_1.default.post('https://accounts.zoho.com/oauth/v2/token', null, {
            params: {
                code: authCode,
                redirect_uri: process.env.AUTH_REDIRECT_URL,
                client_id: process.env.AUTH_CLIENT_ID_EVOLVE,
                client_secret: process.env.AUTH_CLIENT_SECRET_EVOLVE,
                grant_type: 'authorization_code',
            }
        });
        console.log(response.data, 'response');
        let userInfo = jsonwebtoken_1.default.decode(response.data.id_token);
        console.log(userInfo, 'userInfo');
        if (!userInfo) {
            response = yield axios_1.default.post('https://accounts.zoho.in/oauth/v2/token', null, {
                params: {
                    code: authCode,
                    redirect_uri: process.env.AUTH_REDIRECT_URL,
                    client_id: process.env.AUTH_CLIENT_ID_PLUUGIN,
                    client_secret: process.env.AUTH_CLIENT_SECRET_PLUUGIN,
                    grant_type: 'authorization_code',
                }
            });
            userInfo = jsonwebtoken_1.default.decode(response.data.id_token);
        }
        const user = yield User_1.default.findOne({ where: { email: userInfo.email } });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Login Failure. Please ask your admin to register you in the platform'
            });
        }
        let token;
        if (!user.accessToken) {
            token = jsonwebtoken_1.default.sign({ email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email }, JWTKEY);
            yield User_1.default.update({
                accessToken: token,
                zohoAccessToken: response.data.access_token,
                refreshToken: response.data.refresh_token
            }, {
                where: {
                    email: userInfo.email
                }
            });
        }
        return res.status(201).json({
            success: true,
            message: `Login success`,
            data: {
                token: user.accessToken ? user.accessToken : token,
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
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let authHeader = req.header('Authorization'), accessToken;
        if (authHeader) {
            accessToken = authHeader.split(' ')[1];
        }
        else {
            accessToken = 'none';
        }
        const user = yield User_1.default.findOne({ where: { accessToken } });
        yield User_1.default.update({
            accessToken: null,
            zohoAccessToken: null,
            refreshToken: null
        }, {
            where: {
                email: user === null || user === void 0 ? void 0 : user.email
            }
        });
        return res.status(201).json({
            success: true,
            message: `Logout success`
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "auth.controller.js -> logout"
            },
        });
    }
});
exports.logout = logout;
const newEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, department } = req.body;
        let employeeDepartment = yield Department_1.default.findOne({ where: { name: department } });
        if (!employeeDepartment) {
            employeeDepartment = yield Department_1.default.create({
                name: department
            });
        }
        let newEmployee = yield User_1.default.create({
            email
        });
        let employeeDepartmentRel = yield UserDepartment_1.default.create({
            userId: newEmployee.id,
            departmentId: employeeDepartment.id
        });
        if (employeeDepartmentRel)
            return res.status(201).json({
                success: true,
                message: `Employee Added`,
                data: {},
            });
        else
            return res.status(400).json({
                success: false,
                message: 'Some error occured in auth.controller.ts -> newEmployee',
                data: {}
            });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "auth.controller.js -> newEmployee"
            },
        });
    }
});
exports.newEmployee = newEmployee;
const getAssignees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.findAll({ attributes: ['email'] });
        const departments = yield Department_1.default.findAll({ attributes: ['name'], where: { 'name': { [sequelize_1.Op.ne]: 'All' } } });
        let assignees = [];
        users.map(user => assignees.push(user.email));
        departments.map(department => assignees.push(department.name));
        return res.status(201).json({
            success: true,
            message: `Assignees Fetched Successfully`,
            data: {
                assignees
            }
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "auth.controller.js -> getAssignees"
            },
        });
    }
});
exports.getAssignees = getAssignees;
