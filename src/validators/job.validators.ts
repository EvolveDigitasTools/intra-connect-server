import { RequestHandler } from "express";
import Joi from "joi";
import Job from "../models/Job";

export const validateNewJob: RequestHandler = async (req, res, next) => {
    try {
        const newJob = Joi.object({
            name: Joi.string().required(),
            nodes: Joi.string()
        })
        const { nodes } = await newJob.validateAsync(req.body);
        const nodesJSON = JSON.parse(nodes)

        const jobStep = Joi.object({
            workflowStepId: Joi.number().required(),
            assignees: Joi.array().items(Joi.string()),
            approvers: Joi.array().items(Joi.string()),
            timeNeeded: Joi.number(),
            timeUnit: Joi.string()
        })
        const jobStepsJSON = Joi.array().items(jobStep);
        await jobStepsJSON.validateAsync(nodesJSON)
        next();

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}

export const validateJobId: RequestHandler = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const job = await Job.findOne({ where: { id: jobId } })
        if (!job)
            return res.status(400).json({
                success: false,
                message: "Job with this id don't exist"
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