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
exports.validateAddAdmin = void 0;
const joi_1 = __importDefault(require("joi"));
const Department_1 = __importDefault(require("../models/Department"));
const User_1 = __importDefault(require("../models/User"));
const validateAddAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addAdmin = joi_1.default.object({
            department: joi_1.default.string().required(),
            email: joi_1.default.string().required()
        });
        const value = yield addAdmin.validateAsync(req.body);
        const { department, email } = value;
        const departmentTest = yield Department_1.default.findOne({ where: { name: department } });
        if (!departmentTest)
            return res.status(400).json({
                success: false,
                message: "Department with the given name doesn't exist"
            });
        const user = yield User_1.default.findOne({ where: { email }, include: { model: Department_1.default } });
        if (!user)
            return res.status(400).json({
                success: false,
                message: "User with the given mail doesn't exist"
            });
        if (!user.departments.includes(department))
            return res.status(400).json({
                success: false,
                message: "User needs to be part of the department before becoming admin"
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
exports.validateAddAdmin = validateAddAdmin;
