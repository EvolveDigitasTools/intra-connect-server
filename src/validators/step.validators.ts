import { RequestHandler } from "express";
import Joi from "joi";
import Workflow from "../models/workflows/workflows/Workflow";
import WorkflowStep from "../models/workflows/workflows/WorkflowStep";

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

export const validateWorkflowStepId: RequestHandler = async (req, res, next) => {
    try {
        const workflowStepId = req.params.workflowStepId
        const step = await WorkflowStep.findOne({ where: { id: Number(workflowStepId) } })
        if (!step)
            return res.status(400).json({
                success: false,
                message: 'Step not found with the given id'
            })
        next()
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}

export const validateStepUpdate: RequestHandler = async (req, res, next) => {
    try {
        const validateUpdate = Joi.object({
            position_x: Joi.number(),
            position_y: Joi.number()
        })

        await validateUpdate.validateAsync(req.body);
        next();

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}