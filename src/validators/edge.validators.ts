import { RequestHandler } from "express";
import Joi from "joi";
import WorkflowStep from "../models/WorkflowStep";
import WorkflowEdge from "../models/WorkflowEdge";

export const validateNewEdge: RequestHandler = async (req, res, next) => {
    try {
        const validateNew = Joi.object({
            source: Joi.number().required(),
            target: Joi.number().required(),
        })

        const { source, target } = await validateNew.validateAsync(req.body);
        const sourceWorkflowStep = await WorkflowStep.findOne({ where: { id: source } })
        const targetWorkflowStep = await WorkflowStep.findOne({ where: { id: target } })
        if(!(sourceWorkflowStep && targetWorkflowStep))
        return res.status(400).json({
            success: false,
            message: "source or target id incorrect"
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

export const validateEdgeId: RequestHandler = async (req, res, next) => {
    try {
        const workflowEdge = await WorkflowEdge.findOne({ where: { id: Number(req.params.edgeId) } })
        if(!workflowEdge)
        return res.status(400).json({
            success: false,
            message: "workflow edge with this id doesn't exist"
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