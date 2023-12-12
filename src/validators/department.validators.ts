import { RequestHandler } from "express";
import Joi from "joi";
import Department from "../models/auth/Department";
import User from "../models/auth/User";

export const validateAddAdmin: RequestHandler = async (req, res, next) => {
    try {
        const addAdmin = Joi.object({
            department: Joi.string().required(),
            email: Joi.string().required()
        })
        const value = await addAdmin.validateAsync(req.body);
        const { department, email } = value;
        const departmentTest = await Department.findOne({ where: { name: department } })
        if (!departmentTest)
            return res.status(400).json({
                success: false,
                message: "Department with the given name doesn't exist"
            })
        const user = await User.findOne({ where: { email }, include: { model: Department } })
        if(!user)
        return res.status(400).json({
            success: false,
            message: "User with the given mail doesn't exist"
        })
        if(!user.departments.includes(department))
        return res.status(400).json({
            success: false,
            message: "User needs to be part of the department before becoming admin"
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