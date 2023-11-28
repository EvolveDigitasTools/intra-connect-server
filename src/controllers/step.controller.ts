import { RequestHandler } from "express";
import Department from "../models/Department";
import Workflow from "../models/Workflow";
import Step from "../models/Step";

export const newStep: RequestHandler = async (req, res) => {
    try {
        const { name, type, description, assigneesDesignation } = req.body;

        const step = await Step.create({
            name,
            type,
            description,
            assigneesDesignation,
            workflowId: Number(req.params.workflowId)
        })

        return res.status(201).json({
            success: true,
            message: 'Step successfully created',
            data: {
                step
            }
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "workflow.controller.js -> newWorkflow"
            },
        });
    }
};