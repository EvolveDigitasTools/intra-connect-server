import { RequestHandler } from "express";
import Joi from "joi";
import Department from "../models/auth/Department";
import Workflow from "../models/workflows/workflows/Workflow";

export const validateNewWorkflow: RequestHandler = async (req, res, next) => {
    try {
        const newWorkflow = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            departments: Joi.string().required()
        })
        const { departments } = await newWorkflow.validateAsync(req.body);

        const departmentsArray = JSON.parse(departments)

        for (let i = 0; i < departmentsArray.length; i++) {
            const department = departmentsArray[i];
            const isDepartmentExist = await Department.findOne({ where: { name: department } })
            if (!isDepartmentExist)
                return res.status(400).json({
                    success: false,
                    message: "Department with the given name doesn't exist"
                })
        }
        next();

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}

export const validateWorkflowId: RequestHandler = async (req, res, next) => {
    try {
        const workflowId = req.params.workflowId;
        const workflow = await Workflow.findOne({ where: { id: workflowId } })
        if (!workflow)
            return res.status(400).json({
                success: false,
                message: "Workflow with this id don't exist"
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