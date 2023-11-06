import { RequestHandler } from "express";
import User from "../models/User";
import Department from "../models/Department";
import UserDepartment from "../models/UserDepartment";
import { Sequelize } from "sequelize-typescript";
import Board from "../models/Board";
import { isUser } from "../utils/functions";
import { UserBoard } from "../models/UserBoard";
import { DepartmentBoard } from "../models/DepartmentBoard";
import List from "../models/List";
import Card from "../models/Card";

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

export const getBoards: RequestHandler = async (req, res) => {
    try {
        const user = await User.findOne({ where: { accessToken: req.header('Authorization')?.split(' ')[1] } })

        const boards = await Board.findAll({
            attributes: ['id', 'title'],
            include: [
                {
                    model: User,
                    attributes: [],
                    as: 'creator'
                },
                {
                    model: User,
                    attributes: [],
                    as: 'members'
                },
                {
                    model: Department,
                    as: 'departments',
                    include: [
                        {
                            model: UserDepartment
                        }
                    ]
                }
            ],
            where: Sequelize.or(
                { createdBy: user?.id },
                { '$members.id$': user?.id },
                { '$departments.users.userId$': user?.id }
            )
        });

        return res.status(200).json({
            success: true,
            message: 'Boards successfully fetched',
            data: {
                boards
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

export const getBoard: RequestHandler = async (req, res) => {
    try {
        const boardId = req.params.boardId;

        const board = await Board.findOne({
            attributes: ['id', 'title', 'listOrder'],
            where: {
                id: boardId
            },
            include: [
                {
                    model: List,
                    attributes: ['id', 'boardListId', 'cardOrder', 'title']
                },
                {
                    model: Card,
                    attributes: ['id', 'boardCardId', 'title']
                }
            ]
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