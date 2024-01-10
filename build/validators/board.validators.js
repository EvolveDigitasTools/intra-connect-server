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
exports.validateUpdateBoard = exports.validateBoardId = exports.validateNewBoard = void 0;
const joi_1 = __importDefault(require("joi"));
const Board_1 = __importDefault(require("../models/boards/Board"));
const validateNewBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBoard = joi_1.default.object({
            title: joi_1.default.string().required(),
            members: joi_1.default.array().min(1)
        });
        req.body.members = JSON.parse(req.body.members);
        yield newBoard.validateAsync(req.body);
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
exports.validateNewBoard = validateNewBoard;
const validateBoardId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getBoard = joi_1.default.object({
            boardId: joi_1.default.number().required()
        });
        yield getBoard.validateAsync(req.params);
        const boardId = req.params.boardId;
        const board = yield Board_1.default.findOne({ where: { id: boardId } });
        if (!board)
            return res.status(400).json({
                success: false,
                message: "Board with this id doesn't exist"
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
exports.validateBoardId = validateBoardId;
const validateUpdateBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateBoard = joi_1.default.object({
            listOrder: joi_1.default.string().required(),
            lists: joi_1.default.string().required(),
            cards: joi_1.default.string().required()
        });
        const { lists, cards } = yield updateBoard.validateAsync(req.body);
        const listsJSON = JSON.parse(lists);
        const cardsJSON = JSON.parse(cards);
        const listsCheck = joi_1.default.array().items(joi_1.default.object({
            boardListId: joi_1.default.number().required(),
            cardOrder: joi_1.default.string().required(),
            title: joi_1.default.string().required()
        }));
        const cardsCheck = joi_1.default.array().items(joi_1.default.object({
            boardCardId: joi_1.default.number().required(),
            id: joi_1.default.number().required(),
            title: joi_1.default.string().required()
        }));
        yield listsCheck.validateAsync(listsJSON);
        yield cardsCheck.validateAsync(cardsJSON);
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
exports.validateUpdateBoard = validateUpdateBoard;
