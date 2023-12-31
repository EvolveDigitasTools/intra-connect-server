import { RequestHandler } from "express";
import Step from "../models/workflows/Step";
import WorkflowStep from "../models/workflows/workflows/WorkflowStep";

export const newWorkflowStep: RequestHandler = async (req, res) => {
    try {
        const { name, type, description, assigneesDesignation } = req.body;

        const step = await Step.findOne({ where: { type } })

        const workflowStep = await WorkflowStep.create({
            workflowId: Number(req.params.workflowId),
            stepId: step?.id,
            description,
            assigneesDesignation,
            name
        })

        return res.status(201).json({
            success: true,
            message: 'Workflow Step successfully created',
            data: {
                workflowStep
            }
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "step.controller.js -> newWorkflowStep"
            },
        });
    }
};

export const updateWorkflowStep: RequestHandler = async (req, res) => {
    try {
        const { name, description, assigneesDesignation, position_x, position_y } = req.body;

        const workflowStepId = req.params.workflowStepId

        const workflowStep = await WorkflowStep.update({
            name,
            description,
            assigneesDesignation,
            position_x,
            position_y
        }, { where: { id: Number(workflowStepId) } })

        return res.status(201).json({
            success: true,
            message: 'Workflow Step successfully updated',
            data: {
                workflowStep
            }
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "step.controller.js -> updateWorkflowStep"
            },
        });
    }
};

export const deleteWorkflowStep: RequestHandler = async (req, res) => {
    try {
        const workflowStepId = req.params.workflowStepId

        await WorkflowStep.destroy({ where: { id: Number(workflowStepId) } })

        return res.status(201).json({
            success: true,
            message: 'Workflow Step successfully deleted'
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "step.controller.js -> deleteWorkflowStep"
            },
        });
    }
};