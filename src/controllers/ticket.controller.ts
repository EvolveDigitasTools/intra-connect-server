import { RequestHandler } from "express";
import User from "../models/auth/User";
import Ticket from "../models/tickets/Ticket";
import UserTicket from "../models/tickets/UserTicket";
import DepartmentTicket from "../models/tickets/DepartmentTicket";
import Department from "../models/auth/Department";
import File from "../models/utils/File";
import { sendMailSetup } from "../utils/mail.service";
import UserDepartment from "../models/auth/UserDepartment";
import { Sequelize } from "sequelize-typescript";
import TicketChat from "../models/tickets/TicketChat";
import { isUser } from "../utils/functions";

interface TicketRequestBody {
    title: string;
    description: string;
    assignees: string;
}

export const newTicket: RequestHandler = async (req, res) => {
    try {
        const { title, description, assignees } = req.body as TicketRequestBody;
        const files = req.files as Express.Multer.File[], assigneesArr = JSON.parse(assignees);
        const user = await User.findOne({ where: { accessToken: req.header('Authorization')?.split(' ')[1] } })

        const ticket = await Ticket.create({
            title,
            description,
            createdBy: user?.id,
        })
        let mailSent
        for (let i = 0; i < assigneesArr.length; i++) {
            const assignee = assigneesArr[i];
            const variables = {
                ticketId: ticket.id,
                title
            }
            if (isUser(assignee)) {
                const assigneeUser = await User.findOne({ where: { email: assignee } })
                const userTicket = await UserTicket.create({
                    userId: assigneeUser?.id,
                    ticketId: ticket.id
                })
                mailSent = await sendMailSetup('new-ticket', assignee, variables);
            }
            else {
                const assigneeDepartment = await Department.findOne({ where: { name: assignee } })

                const userDepartment = await UserDepartment.findOne({
                    where: {
                        departmentId: assigneeDepartment?.id,
                        isAdmin: true
                    },
                    include: {
                        model: User,
                        as: 'user'
                    }
                });

                const departmentTicket = await DepartmentTicket.create({
                    departmentId: assigneeDepartment?.id,
                    ticketId: ticket.id
                })
                mailSent = await sendMailSetup('new-ticket-dept', userDepartment?.user?.email, variables)
            }
        }

        for (const file of files) {
            const decodedFile = Buffer.from(file.buffer.toString('base64'), 'base64');
            await File.create({
                fileName: file.originalname,
                fileContent: decodedFile,
                fileType: 'ticket-main',
                ticketId: ticket.id
            })
        }

        if (mailSent)
            return res.status(201).json({
                success: true,
                message: 'Ticket successfully created',
            })

        return res.status(401).json({
            success: false,
            message: 'Unable to send mail',
            data: { mailSent }
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

export const getTickets: RequestHandler = async (req, res) => {
    try {
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

export const getTicket: RequestHandler = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;

        const ticket = await Ticket.findOne({
            attributes: ['id', 'title', 'description', 'status'],
            where: {
                id: ticketId
            },
            include: [
                {
                    model: File,
                    attributes: ['id', 'fileName']
                },
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
                    attributes: ['name'],
                    as: 'assignedDepartments'
                }
            ]
        })

        return res.status(200).json({
            success: true,
            message: 'Tickets successfully fetched',
            data: {
                ticket
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

export const closeTicket: RequestHandler = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;

        const ticket = await Ticket.update({
            status: 'closed'
        }, {
            where: {
                id: ticketId
            }
        })

        return res.status(200).json({
            success: true,
            message: 'Ticket successfully closed',
            data: {
                ticket
            }
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "ticket.controller.js -> closeTicket"
            },
        });
    }
}