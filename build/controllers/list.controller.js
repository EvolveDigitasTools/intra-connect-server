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
exports.newList = void 0;
const Board_1 = __importDefault(require("../models/Board"));
const List_1 = __importDefault(require("../models/List"));
const newList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const board = yield Board_1.default.findOne({ where: { id: req.params.boardId } });
        const list = yield List_1.default.create({
            title,
            boardId: board === null || board === void 0 ? void 0 : board.id,
        });
        if (list)
            return res.status(201).json({
                success: true,
                message: 'List successfully created'
            });
        else
            return res.status(400).json({
                success: false,
                message: 'Some error occured'
            });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "list.controller.js -> newList"
            },
        });
    }
});
exports.newList = newList;
