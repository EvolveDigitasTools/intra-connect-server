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
exports.getBoard = exports.getBoards = exports.newBoard = void 0;
const User_1 = __importDefault(require("../models/auth/User"));
const Department_1 = __importDefault(require("../models/auth/Department"));
const UserDepartment_1 = __importDefault(require("../models/auth/UserDepartment"));
const sequelize_typescript_1 = require("sequelize-typescript");
const Board_1 = __importDefault(require("../models/boards/Board"));
const functions_1 = require("../utils/functions");
const UserBoard_1 = __importDefault(require("../models/boards/UserBoard"));
const DepartmentBoard_1 = __importDefault(require("../models/boards/DepartmentBoard"));
const List_1 = __importDefault(require("../models/boards/List"));
const Card_1 = __importDefault(require("../models/boards/Card"));
const newBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, members } = req.body;
        const user = yield User_1.default.findOne({ where: { accessToken: (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1] } });
        const board = yield Board_1.default.create({
            title,
            createdBy: user === null || user === void 0 ? void 0 : user.id,
        });
        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            if ((0, functions_1.isUser)(member)) {
                const memberUser = yield User_1.default.findOne({ where: { email: member } });
                const userBoard = yield UserBoard_1.default.create({
                    userId: memberUser === null || memberUser === void 0 ? void 0 : memberUser.id,
                    boardId: board.id
                });
            }
            else {
                const memberDepartment = yield Department_1.default.findOne({ where: { name: member } });
                const departmentTicket = yield DepartmentBoard_1.default.create({
                    departmentId: memberDepartment === null || memberDepartment === void 0 ? void 0 : memberDepartment.id,
                    boardId: board.id
                });
            }
        }
        return res.status(201).json({
            success: true,
            message: 'Board successfully created',
            data: {
                board
            }
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "board.controller.js -> newBoard"
            },
        });
    }
});
exports.newBoard = newBoard;
const getBoards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const user = yield User_1.default.findOne({ where: { accessToken: (_b = req.header('Authorization')) === null || _b === void 0 ? void 0 : _b.split(' ')[1] } });
        const boards = yield Board_1.default.findAll({
            attributes: ['id', 'title'],
            include: [
                {
                    model: User_1.default,
                    attributes: [],
                    as: 'creator'
                },
                {
                    model: User_1.default,
                    attributes: [],
                    as: 'members'
                },
                {
                    model: Department_1.default,
                    as: 'departments',
                    include: [
                        {
                            model: UserDepartment_1.default
                        }
                    ]
                }
            ],
            where: sequelize_typescript_1.Sequelize.or({ createdBy: user === null || user === void 0 ? void 0 : user.id }, { '$members.id$': user === null || user === void 0 ? void 0 : user.id }, { '$departments.users.userId$': user === null || user === void 0 ? void 0 : user.id })
        });
        return res.status(200).json({
            success: true,
            message: 'Boards successfully fetched',
            data: {
                boards
            }
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "board.controller.js -> newBoard"
            },
        });
    }
});
exports.getBoards = getBoards;
const getBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boardId = req.params.boardId;
        const board = yield Board_1.default.findOne({
            attributes: ['id', 'title', 'listOrder'],
            where: {
                id: boardId
            },
            include: [
                {
                    model: List_1.default,
                    attributes: ['id', 'boardListId', 'cardOrder', 'title']
                },
                {
                    model: Card_1.default,
                    attributes: ['id', 'boardCardId', 'title']
                }
            ]
        });
        return res.status(200).json({
            success: true,
            message: 'Board successfully fetched',
            data: {
                board
            }
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "board.controller.js -> getBoard"
            },
        });
    }
});
exports.getBoard = getBoard;
