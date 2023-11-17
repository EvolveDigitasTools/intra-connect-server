import { RequestHandler } from "express";
import Joi from "joi";
import Department from "../models/Department";

export const validateNewWorkflow: RequestHandler = async (req, res, next) => {
    try {
        const newWorkflow = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            department: Joi.string().required()
        })
        await newWorkflow.validateAsync(req.body);

        const department = req.body.department
        const isDepartmentExist = await Department.findOne({ where: { name: department } })
        if (!isDepartmentExist)
            return res.status(400).json({
                success: false,
                message: "Department with the given name doesn't exist"
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