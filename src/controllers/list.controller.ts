import { RequestHandler } from "express";
import Board from "../models/boards/Board";
import List from "../models/boards/List";

export const newList: RequestHandler = async (req, res) => {
    try {
        const { title } = req.body;
        const board = await Board.findOne({ where: { id: req.params.boardId } })

        const list = await List.create({
            title,
            boardId: board?.id,
        })

        if(list)
        return res.status(201).json({
            success: true,
            message: 'List successfully created'
        })
        else
        return res.status(400).json({
            success: false,
            message: 'Some error occured'
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "list.controller.js -> newList"
            },
        });
    }
};