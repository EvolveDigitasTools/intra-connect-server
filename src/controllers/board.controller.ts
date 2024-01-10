import { RequestHandler } from "express";
import User from "../models/auth/User";
import Department from "../models/auth/Department";
import UserDepartment from "../models/auth/UserDepartment";
import { Sequelize } from "sequelize-typescript";
import Board from "../models/boards/Board";
import { isUser } from "../utils/functions";
import UserBoard from "../models/boards/UserBoard";
import DepartmentBoard from "../models/boards/DepartmentBoard";
import List from "../models/boards/List";
import Card from "../models/boards/Card";

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
            where: { id: boardId },
            include: [
                {
                    model: List,
                    attributes: [
                        ['boardListId', 'id'],
                        'cardOrder',
                        'title'
                    ]
                },
                {
                    model: Card,
                    attributes: [
                        ['id', 'mainId'], // Alias 'id' as 'mainId'
                        ['boardCardId', 'id'], // Alias 'boardCardId' as 'id'
                        'title'
                    ]
                }
            ]
        });

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

export const updateBoard: RequestHandler = async (req, res) => {
    try {
        const boardId = req.params.boardId;
        const { listOrder, lists, cards } = req.body;

        const board = await Board.update({
            listOrder
        }, {
            where: { id: boardId }
        })

        const listsJSON: {
            boardListId: number,
            cardOrder: string,
            title: string
        }[] = JSON.parse(lists)

        const cardsJSON: {
            boardCardId: number,
            id: number,
            title: string
        }[] = JSON.parse(cards)

        const existingLists = await List.findAll({ where: { boardId } });
        const existingCards = await Card.findAll({ where: { boardId } });

        // Process Lists
        for (const listItem of listsJSON) {
            const existingList = existingLists.find(list => list.boardListId == listItem.boardListId);
            if (existingList) {
                await existingList.update({
                    title: listItem.title,
                    cardOrder: listItem.cardOrder
                });
            } else {
                await List.create({
                    title: listItem.title,
                    boardListId: listItem.boardListId,
                    cardOrder: listItem.cardOrder,
                    boardId
                });
            }
        }

        // Process Cards
        for (const cardItem of cardsJSON) {
            const existingCard = existingCards.find(card => card.id == cardItem.id);
            if (existingCard) {
                await existingCard.update({
                    title: cardItem.title
                });
            } else {
                await Card.create({
                    title: cardItem.title,
                    boardCardId: cardItem.boardCardId,
                    boardId
                });
            }
        }

        // Delete orphaned lists and cards
        const listsToDelete = existingLists.filter(list => !listsJSON.some(item => item.boardListId === list.boardListId));
        const cardsToDelete = existingCards.filter(card => !cardsJSON.some(item => item.boardCardId === card.boardCardId));

        for (const list of listsToDelete) {
            await list.destroy();
        }

        for (const card of cardsToDelete) {
            await card.destroy();
        }


        return res.status(200).json({
            success: true,
            message: 'Board successfully updated',
            data: {
                board
            }
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "board.controller.js -> updateBoard"
            },
        });
    }
};