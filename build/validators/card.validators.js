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
exports.validateNewCard = void 0;
const joi_1 = __importDefault(require("joi"));
const List_1 = __importDefault(require("../models/boards/List"));
const validateNewCard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCard = joi_1.default.object({
            title: joi_1.default.string().required()
        });
        yield newCard.validateAsync(req.body);
        const { listId } = req.params;
        const list = yield List_1.default.findOne({ where: { id: listId } });
        if (!list)
            return res.status(400).json({
                success: false,
                message: "List with the given listId doesn't exists"
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
exports.validateNewCard = validateNewCard;
