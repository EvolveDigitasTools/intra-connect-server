import { RequestHandler } from "express";
import Joi from "joi";
import Board from "../models/boards/Board";

export const validateNewList: RequestHandler = async (req, res, next) => {
    try {
        const newList = Joi.object({
            title: Joi.string().required()
        })
        await newList.validateAsync(req.body);
        const { boardId } = req.params;
        console.log(boardId, req.params)
        const board = await Board.findOne({where: { id: boardId}})
        if(!board)
        return res.status(400).json({
            success: false,
            message: "Board with the given boardId doesn't exists"
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