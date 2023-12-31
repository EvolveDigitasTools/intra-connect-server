import { RequestHandler } from "express";
import Joi from "joi";
import User from "../models/auth/User";

export const validateNew: RequestHandler = async (req, res, next) => {
    try {
        const validateNew = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            assignees: Joi.string().required()
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

export const validateGetTicket: RequestHandler = async (req, res, next) => {
    try {
        const validateGet = Joi.object({
            ticketId: Joi.string().required()
        })

        await validateGet.validateAsync(req.params);
        next();

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}

export const validateNewChat: RequestHandler = async (req, res, next) => {
    try {
        const validateNewChatParams = Joi.object({
            ticketId: Joi.string().required()
        })
        const validateNewChatBody = Joi.object({
            message: Joi.string()
        })

        await validateNewChatParams.validateAsync(req.params);
        await validateNewChatBody.validateAsync(req.body);
        next();

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}