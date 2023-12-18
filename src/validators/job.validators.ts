import { RequestHandler } from "express";
import Joi from "joi";
import Job from "../models/workflows/jobs/Job";
import JobStep from "../models/workflows/jobs/JobStep";

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

export const validateJobStepId: RequestHandler = async (req, res, next) => {
    try {
        const jobStepId = req.params.jobStepId;
        const jobStep = await JobStep.findOne({ where: { id: jobStepId } })
        if (!jobStep)
            return res.status(400).json({
                success: false,
                message: "JobStep with this id don't exist"
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

export const validateRemarks: RequestHandler = async (req, res, next) => {
    try {
        const remarks = Joi.object({
            remarks: Joi.string().required()
        })
        await remarks.validateAsync(req.body);
        next();

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}