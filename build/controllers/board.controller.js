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
exports.getChats = exports.newChat = exports.getBoard = exports.getTickets = exports.newBoard = void 0;
const User_1 = __importDefault(require("../models/User"));
const Ticket_1 = __importDefault(require("../models/Ticket"));
const Department_1 = __importDefault(require("../models/Department"));
const File_1 = __importDefault(require("../models/File"));
const UserDepartment_1 = __importDefault(require("../models/UserDepartment"));
const sequelize_typescript_1 = require("sequelize-typescript");
const TicketChat_1 = require("../models/TicketChat");
const Board_1 = __importDefault(require("../models/Board"));
const functions_1 = require("../utils/functions");
const UserBoard_1 = require("../models/UserBoard");
const DepartmentBoard_1 = require("../models/DepartmentBoard");
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
                const userBoard = yield UserBoard_1.UserBoard.create({
                    userId: memberUser === null || memberUser === void 0 ? void 0 : memberUser.id,
                    boardId: board.id
                });
            }
            else {
                const memberDepartment = yield Department_1.default.findOne({ where: { name: member } });
                const departmentTicket = yield DepartmentBoard_1.DepartmentBoard.create({
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
const getTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        console.log('called');
        const user = yield User_1.default.findOne({ where: { accessToken: (_b = req.header('Authorization')) === null || _b === void 0 ? void 0 : _b.split(' ')[1] } });
        const tickets = yield Ticket_1.default.findAll({
            attributes: ['id', 'title', 'description', 'status'],
            include: [
                {
                    model: User_1.default,
                    attributes: ['email'],
                    as: 'creator'
                },
                {
                    model: User_1.default,
                    attributes: ['email'],
                    as: 'assignees'
                },
                {
                    model: Department_1.default,
                    as: 'assignedDepartments',
                    include: [
                        {
                            model: UserDepartment_1.default
                        }
                    ]
                }
            ],
            where: sequelize_typescript_1.Sequelize.or({ createdBy: user === null || user === void 0 ? void 0 : user.id }, { '$assignees.id$': user === null || user === void 0 ? void 0 : user.id }, { '$assignedDepartments.users.userId$': user === null || user === void 0 ? void 0 : user.id })
        });
        return res.status(200).json({
            success: true,
            message: 'Tickets successfully fetched',
            data: {
                tickets
            }
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "ticket.controller.js -> newTicket"
            },
        });
    }
});
exports.getTickets = getTickets;
const getBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boardId = req.params.boardId;
        const board = yield Board_1.default.findOne({
            attributes: ['id', 'title'],
            where: {
                id: boardId
            },
            include: []
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
const newChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const message = req.body.message;
        const ticketId = req.params.ticketId;
        const files = req.files;
        const user = yield User_1.default.findOne({ where: { accessToken: (_c = req.header('Authorization')) === null || _c === void 0 ? void 0 : _c.split(' ')[1] } });
        const newMsg = yield TicketChat_1.TicketChat.create({
            ticketId,
            userId: user === null || user === void 0 ? void 0 : user.id,
            message
        });
        for (const file of files) {
            const decodedFile = Buffer.from(file.buffer.toString('base64'), 'base64');
            yield File_1.default.create({
                fileName: file.originalname,
                fileContent: decodedFile,
                fileType: 'ticket-chat',
                ticketChatId: newMsg.id
            });
        }
        return res.status(201).json({
            success: true,
            message: 'Message successfully added',
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "ticket.controller.js -> newTicket"
            },
        });
    }
});
exports.newChat = newChat;
const getChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticketId = req.params.ticketId;
        const chats = yield TicketChat_1.TicketChat.findAll({
            attributes: ['message', 'createdAt', [sequelize_typescript_1.Sequelize.col('user.email'), 'email']],
            where: {
                ticketId
            },
            include: [
                {
                    model: File_1.default,
                    attributes: ['id', 'fileName']
                },
                {
                    model: User_1.default,
                    attributes: []
                }
            ]
        });
        return res.status(200).json({
            success: true,
            message: 'Chats successfully fetched',
            data: {
                chats
            }
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "ticket.controller.js -> newTicket"
            },
        });
    }
});
exports.getChats = getChats;
