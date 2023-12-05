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
exports.getChats = exports.newChat = exports.getTicket = exports.getTickets = exports.newTicket = void 0;
const User_1 = __importDefault(require("../models/User"));
const Ticket_1 = __importDefault(require("../models/Ticket"));
const UserTicket_1 = __importDefault(require("../models/UserTicket"));
const DepartmentTicket_1 = __importDefault(require("../models/DepartmentTicket"));
const Department_1 = __importDefault(require("../models/Department"));
const File_1 = __importDefault(require("../models/File"));
const mail_service_1 = require("../utils/mail.service");
const UserDepartment_1 = __importDefault(require("../models/UserDepartment"));
const sequelize_typescript_1 = require("sequelize-typescript");
const TicketChat_1 = __importDefault(require("../models/TicketChat"));
const functions_1 = require("../utils/functions");
const newTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { title, description, assignees } = req.body;
        const files = req.files, assigneesArr = JSON.parse(assignees);
        const user = yield User_1.default.findOne({ where: { accessToken: (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1] } });
        const ticket = yield Ticket_1.default.create({
            title,
            description,
            createdBy: user === null || user === void 0 ? void 0 : user.id,
        });
        let mailSent;
        for (let i = 0; i < assigneesArr.length; i++) {
            const assignee = assigneesArr[i];
            const variables = {
                ticketId: ticket.id,
                title
            };
            if ((0, functions_1.isUser)(assignee)) {
                const assigneeUser = yield User_1.default.findOne({ where: { email: assignee } });
                const userTicket = yield UserTicket_1.default.create({
                    userId: assigneeUser === null || assigneeUser === void 0 ? void 0 : assigneeUser.id,
                    ticketId: ticket.id
                });
                mailSent = yield (0, mail_service_1.sendMailSetup)('new-ticket', assignee, variables);
            }
            else {
                const assigneeDepartment = yield Department_1.default.findOne({ where: { name: assignee } });
                const userDepartment = yield UserDepartment_1.default.findOne({
                    where: {
                        departmentId: assigneeDepartment === null || assigneeDepartment === void 0 ? void 0 : assigneeDepartment.id,
                        isAdmin: true
                    },
                    include: {
                        model: User_1.default,
                        as: 'user'
                    }
                });
                const departmentTicket = yield DepartmentTicket_1.default.create({
                    departmentId: assigneeDepartment === null || assigneeDepartment === void 0 ? void 0 : assigneeDepartment.id,
                    ticketId: ticket.id
                });
                mailSent = yield (0, mail_service_1.sendMailSetup)('new-ticket-dept', (_b = userDepartment === null || userDepartment === void 0 ? void 0 : userDepartment.user) === null || _b === void 0 ? void 0 : _b.email, variables);
            }
        }
        for (const file of files) {
            const decodedFile = Buffer.from(file.buffer.toString('base64'), 'base64');
            yield File_1.default.create({
                fileName: file.originalname,
                fileContent: decodedFile,
                fileType: 'ticket-main',
                ticketId: ticket.id
            });
        }
        if (mailSent)
            return res.status(201).json({
                success: true,
                message: 'Ticket successfully created',
            });
        return res.status(401).json({
            success: false,
            message: 'Unable to send mail',
            data: { mailSent }
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
exports.newTicket = newTicket;
const getTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const user = yield User_1.default.findOne({ where: { accessToken: (_c = req.header('Authorization')) === null || _c === void 0 ? void 0 : _c.split(' ')[1] } });
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
const getTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticketId = req.params.ticketId;
        const ticket = yield Ticket_1.default.findOne({
            attributes: ['id', 'title', 'description', 'status'],
            where: {
                id: ticketId
            },
            include: [
                {
                    model: File_1.default,
                    attributes: ['id', 'fileName']
                },
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
                    attributes: ['name'],
                    as: 'assignedDepartments'
                }
            ]
        });
        return res.status(200).json({
            success: true,
            message: 'Tickets successfully fetched',
            data: {
                ticket
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
exports.getTicket = getTicket;
const newChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const message = req.body.message;
        const ticketId = req.params.ticketId;
        const files = req.files;
        const user = yield User_1.default.findOne({ where: { accessToken: (_d = req.header('Authorization')) === null || _d === void 0 ? void 0 : _d.split(' ')[1] } });
        const newMsg = yield TicketChat_1.default.create({
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
        const chats = yield TicketChat_1.default.findAll({
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
