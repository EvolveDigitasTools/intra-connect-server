import { RequestHandler } from "express";
import Department from "../models/Department";
import Workflow from "../models/Workflow";
import Step from "../models/Step";

export const newWorkflow: RequestHandler = async (req, res) => {
    try {
        const { name, description, department } = req.body;

        const selectedDepartment = await Department.findOne({ where: { name: department } });

        const workflow = await Workflow.create({
            name,
            description,
            departmentId: selectedDepartment?.id
        })

        return res.status(201).json({
            success: true,
            message: 'Workflow successfully created',
            data: {
                workflow
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

export const getAllWorkflow: RequestHandler = async (req, res) => {
    try {
        const workflows = await Workflow.findAll({
            include: [{
                model: Step,
                as: 'steps'
            }]
        })

        return res.status(200).json({
            success: true,
            message: 'Workflows successfully fetched',
            data: {
                workflows
            }
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "workflow.controller.js -> getAllWorkflows"
            },
        });
    }
};

export const getWorkflow: RequestHandler = async (req, res) => {
    try {
        const workflowId = req.params.id;

        const workflow = await Workflow.findOne({
            where: {
                id: workflowId
            }
        })

        return res.status(200).json({
            success: true,
            message: 'Workflow successfully fetched',
            data: {
                workflow
            }
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "workflow.controller.js -> getWorkflow"
            },
        });
    }
};
// };