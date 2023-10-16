import { RequestHandler } from "express";
import Joi from "joi";

export const validateLogin: RequestHandler = async (req, res, next) => {
    try {
        const validateLogin = Joi.object({
            authCode: Joi.string().required()
        })

        await validateLogin.validateAsync(req.params);
        next();

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}

export const validateNew: RequestHandler = async (req, res, next) => {
    try {
        const validateNew = Joi.object({
            email: Joi.string().email().required(),
            department: Joi.string().required()
        })

        await validateNew.validateAsync(req.body);
        next();

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}