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
exports.validateNewList = void 0;
const joi_1 = __importDefault(require("joi"));
const Board_1 = __importDefault(require("../models/Board"));
const validateNewList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newList = joi_1.default.object({
            title: joi_1.default.string().required()
        });
        yield newList.validateAsync(req.body);
        const { boardId } = req.params;
        console.log(boardId, req.params);
        const board = yield Board_1.default.findOne({ where: { id: boardId } });
        if (!board)
            return res.status(400).json({
                success: false,
                message: "Board with the given boardId doesn't exists"
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
exports.validateNewList = validateNewList;
