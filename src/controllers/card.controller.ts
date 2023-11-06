import { RequestHandler } from "express";
import List from "../models/List";
import Card from "../models/Card";

export const newCard: RequestHandler = async (req, res) => {
    try {
        const { title } = req.body;
        const list = await List.findOne({ where: { id: req.params.listId } })

        const card = await Card.create({
            title,
            listId: list?.id,
        })

        if(card)
        return res.status(201).json({
            success: true,
            message: 'Card successfully created'
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
                "source": "card.controller.js -> newCard"
            },
        });
    }
};