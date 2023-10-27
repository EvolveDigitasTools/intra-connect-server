import { RequestHandler } from "express";
import User from "../models/User";
import Ticket from "../models/Ticket";
import { UserTicket } from "../models/UserTicket";
import { DepartmentTicket } from "../models/DepartmentTicket";
import Department from "../models/Department";
import File from "../models/File";
import { sendMailSetup } from "../utils/mail.service";
import UserDepartment from "../models/UserDepartment";
import { Sequelize } from "sequelize-typescript";
import { TicketChat } from "../models/TicketChat";
import Board from "../models/Board";
import { isUser } from "../utils/functions";
import { UserBoard } from "../models/UserBoard";
import { DepartmentBoard } from "../models/DepartmentBoard";

export const newBoard: RequestHandler = async (req, res) => {
    try {
        const { title, members } = req.body;
        const user = await User.findOne({ where: { accessToken: req.header('Authorization')?.split(' ')[1] } })

        const board = await Board.create({
            title,
            createdBy: user?.id,
        })

        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            if (isUser(member)) {
                const memberUser = await User.findOne({ where: { email: member } })
                const userBoard = await UserBoard.create({
                    userId: memberUser?.id,
                    boardId: board.id
                })
            }
            else {
                const memberDepartment = await Department.findOne({ where: { name: member } })

                const departmentTicket = await DepartmentBoard.create({
                    departmentId: memberDepartment?.id,
                    boardId: board.id
                })
            }
        }

        return res.status(201).json({
            success: true,
            message: 'Board successfully created',
            data: {
                board
            }
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "board.controller.js -> newBoard"
            },
        });
    }
};

export const getTickets: RequestHandler = async (req, res) => {
    try {
        console.log('called')
        const user = await User.findOne({ where: { accessToken: req.header('Authorization')?.split(' ')[1] } })

        const tickets = await Ticket.findAll({
            attributes: ['id', 'title', 'description', 'status'],
            include: [
                {
                    model: User,
                    attributes: ['email'],
                    as: 'creator'
                },
                {
                    model: User,
                    attributes: ['email'],
                    as: 'assignees'
                },
                {
                    model: Department,
                    as: 'assignedDepartments',
                    include: [
                        {
                            model: UserDepartment
                        }
                    ]
                }
            ],
            where: Sequelize.or(
                { createdBy: user?.id },
                { '$assignees.id$': user?.id },
                { '$assignedDepartments.users.userId$': user?.id }
            )
        });

        return res.status(200).json({
            success: true,
            message: 'Tickets successfully fetched',
            data: {
                tickets
            }
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "ticket.controller.js -> newTicket"
            },
        });
    }
};

export const getBoard: RequestHandler = async (req, res) => {
    try {
        const boardId = req.params.boardId;

        const board = await Board.findOne({
            attributes: ['id', 'title'],
            where: {
                id: boardId
            },
            include: []
        })

        return res.status(200).json({
            success: true,
            message: 'Board successfully fetched',
            data: {
                board
            }
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "board.controller.js -> getBoard"
            },
        });
    }
};

export const newChat: RequestHandler = async (req, res) => {
    try {
        const message: string = req.body.message;
        const ticketId = req.params.ticketId;

        const files = req.files as Express.Multer.File[];
        const user = await User.findOne({ where: { accessToken: req.header('Authorization')?.split(' ')[1] } })

        const newMsg = await TicketChat.create({
            ticketId,
            userId: user?.id,
            message
        })

        for (const file of files) {
            const decodedFile = Buffer.from(file.buffer.toString('base64'), 'base64');
            await File.create({
                fileName: file.originalname,
                fileContent: decodedFile,
                fileType: 'ticket-chat',
                ticketChatId: newMsg.id
            })
        }

        return res.status(201).json({
            success: true,
            message: 'Message successfully added',
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "ticket.controller.js -> newTicket"
            },
        });
    }
};

export const getChats: RequestHandler = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;

        const chats = await TicketChat.findAll({
            attributes: ['message', 'createdAt', [Sequelize.col('user.email'), 'email']],
            where: {
                ticketId
            },
            include: [
                {
                    model: File,
                    attributes: ['id', 'fileName']
                },
                {
                    model: User,
                    attributes: []
                }
            ]
        })

        return res.status(200).json({
            success: true,
            message: 'Chats successfully fetched',
            data: {
                chats
            }
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "ticket.controller.js -> newTicket"
            },
        });
    }
};