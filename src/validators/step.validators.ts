import { RequestHandler } from "express";
import Joi from "joi";
import Workflow from "../models/Workflow";

export const validateNewTask: RequestHandler = async (req, res, next) => {
    try {
        const validateNew = Joi.object({
            name: Joi.string().required(),
            type: Joi.string(),
            description: Joi.string().required(),
            assigneesDesignation: Joi.string().required()
        })

        await validateNew.validateAsync(req.body);
        const workflowId = req.params.workflowId
        const workflow = await Workflow.findOne({ where: { id: workflowId } })
        if (!workflow)
            return res.status(400).json({
                success: false,
                message: 'Workflow not found with the given id'
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

export const validateWorkflowId: RequestHandler = async (req, res, next) => {
    try {
        const workflowId = req.params.workflowId
        const workflow = await Workflow.findOne({ where: { id: workflowId } })
        if (!workflow)
            return res.status(400).json({
                success: false,
                message: 'Workflow not found with the given id'
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
