import { RequestHandler } from "express";
import Joi from "joi";
import Board from "../models/boards/Board";

export const validateNewBoard: RequestHandler = async (req, res, next) => {
    try {
        const newBoard = Joi.object({
            title: Joi.string().required(),
            members: Joi.array().min(1)
        })
        req.body.members = JSON.parse(req.body.members)
        await newBoard.validateAsync(req.body);
        next();

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}

export const validateBoardId: RequestHandler = async (req, res, next) => {
    try {
        const getBoard = Joi.object({
            boardId: Joi.number().required()
        })
        await getBoard.validateAsync(req.params);
        const boardId = req.params.boardId
        const board = await Board.findOne({ where: { id: boardId } })
        if (!board)
            return res.status(400).json({
                success: false,
                message: "Board with this id doesn't exist"
            })
        next();

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}

export const validateUpdateBoard: RequestHandler = async (req, res, next) => {
    try {
        const updateBoard = Joi.object({
            listOrder: Joi.string().required(),
            lists: Joi.string().required(),
            cards: Joi.string().required()
        })
        const { lists, cards } = await updateBoard.validateAsync(req.body);

        const listsJSON = JSON.parse(lists)
        const cardsJSON = JSON.parse(cards)

        const listsCheck = Joi.array().items(Joi.object({
            boardListId: Joi.number().required(),
            cardOrder: Joi.string().required(),
            title: Joi.string().required()
        }))

        const cardsCheck = Joi.array().items(Joi.object({
            boardCardId: Joi.number().required(),
            id: Joi.number().required(),
            title: Joi.string().required()
        }))

        await listsCheck.validateAsync(listsJSON)
        await cardsCheck.validateAsync(cardsJSON)
        next();

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}