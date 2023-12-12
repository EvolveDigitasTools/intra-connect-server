import { RequestHandler } from "express";
import Joi from "joi";
import File from "../models/utils/File";

export const validateGetFile: RequestHandler = async (req, res, next) => {
    try {
        const validateFileCode = Joi.object({
            id: Joi.string().required()
        })

        const value = await validateFileCode.validateAsync(req.params);
        const id = value.id;
        const file = await File.findOne({
            where: {
                id
            }
        })
        if(!file)
        return res.status(404).json({
            success: false,
            message: 'No file exists with the id'
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