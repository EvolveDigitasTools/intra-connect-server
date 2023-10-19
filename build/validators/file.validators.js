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
exports.validateGetFile = void 0;
const joi_1 = __importDefault(require("joi"));
const File_1 = __importDefault(require("../models/File"));
const validateGetFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateFileCode = joi_1.default.object({
            id: joi_1.default.string().required()
        });
        const value = yield validateFileCode.validateAsync(req.params);
        const id = value.id;
        const file = yield File_1.default.findOne({
            where: {
                id
            }
        });
        if (!file)
            return res.status(404).json({
                success: false,
                message: 'No file exists with the id'
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
exports.validateGetFile = validateGetFile;
