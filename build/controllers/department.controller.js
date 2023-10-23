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
exports.getTicket = exports.getTickets = exports.addAdmin = void 0;
const User_1 = __importDefault(require("../models/User"));
const Ticket_1 = __importDefault(require("../models/Ticket"));
const Department_1 = __importDefault(require("../models/Department"));
const File_1 = __importDefault(require("../models/File"));
const UserDepartment_1 = __importDefault(require("../models/UserDepartment"));
const sequelize_typescript_1 = require("sequelize-typescript");
const addAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, department } = req.body;
        const user = yield User_1.default.findOne({
            where: {
                email
            }
        });
        const departmentData = yield Department_1.default.findOne({
            where: {
                name: department
            }
        });
        yield UserDepartment_1.default.update({
            isAdmin: true
        }, {
            where: {
                userId: user === null || user === void 0 ? void 0 : user.id,
                departmentId: departmentData === null || departmentData === void 0 ? void 0 : departmentData.id
            }
        });
        return res.status(201).json({
            success: true,
            message: 'Admin Successfully added',
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
exports.addAdmin = addAdmin;
const getTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('called');
        const user = yield User_1.default.findOne({ where: { accessToken: (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1] } });
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
                    as: 'assignedDepartments'
                }
            ],
            where: sequelize_typescript_1.Sequelize.or({ createdBy: user === null || user === void 0 ? void 0 : user.id })
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
                    as: 'creator'
                },
                {
                    model: User_1.default,
                    as: 'assignees'
                },
                {
                    model: Department_1.default,
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
