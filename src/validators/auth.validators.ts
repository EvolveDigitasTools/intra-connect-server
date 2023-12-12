import { RequestHandler } from "express";
import Joi from "joi";
import User from "../models/auth/User";

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

export const validateAuthCode: RequestHandler = async (req, res, next) => {
    try {
        let authHeader = req.header('Authorization'), accessToken
        if (authHeader) {
            accessToken = authHeader.split(' ')[1];
        } else {
            accessToken = 'none'
        }
        const user = await User.findOne({where: {accessToken}})
        if(!user)
        return res.status(401).json({
            success: false,
            message: 'Unauthorized request'
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