import { RequestHandler } from "express";
import Joi from "joi";
import List from "../models/boards/List";

export const validateNewCard: RequestHandler = async (req, res, next) => {
    try {
        const newCard = Joi.object({
            title: Joi.string().required()
        })
        await newCard.validateAsync(req.body);
        const { listId } = req.params;
        const list = await List.findOne({where: { id: listId}})
        if(!list)
        return res.status(400).json({
            success: false,
            message: "List with the given listId doesn't exists"
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