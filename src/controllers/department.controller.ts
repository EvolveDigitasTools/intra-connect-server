import { RequestHandler } from "express";
import User from "../models/auth/User";
import Ticket from "../models/tickets/Ticket";
import Department from "../models/auth/Department";
import File from "../models/utils/File";
import UserDepartment from "../models/auth/UserDepartment";
import { Sequelize } from "sequelize-typescript";

export const addAdmin: RequestHandler = async (req, res) => {
    try {
        const { email, department } = req.body;
        const user = await User.findOne({
            where: {
                email
            }
        })
        const departmentData = await Department.findOne({
            where: {
                name: department
            }
        })
        await UserDepartment.update(
            {
                isAdmin: true
            },
            {
                where: {
                    userId: user?.id,
                    departmentId: departmentData?.id
                }
            }
        )
        return res.status(201).json({
            success: true,
            message: 'Admin Successfully added',
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
                    as: 'assignedDepartments'
                }
            ],
            where: Sequelize.or(
                { createdBy: user?.id },
                // { '$assignees.id$': user?.id },
                // { '$assignedDepartments.user_department.userId$': user?.id }
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
                    as: 'creator'
                },
                {
                    model: User,
                    as: 'assignees'
                },
                {
                    model: Department,
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