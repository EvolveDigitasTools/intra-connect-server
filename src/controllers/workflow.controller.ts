import { RequestHandler } from "express";
import Department from "../models/auth/Department";
import Workflow from "../models/workflows/workflows/Workflow";
import Step from "../models/workflows/Step";
import WorkflowStep from "../models/workflows/workflows/WorkflowStep";
import { Sequelize } from "sequelize-typescript";
import WorkflowEdge from "../models/workflows/workflows/WorkflowEdge";
import WorkflowDepratment from "../models/workflows/workflows/WorkflowDepartment";

export const newWorkflow: RequestHandler = async (req, res) => {
    try {
        const { name, description, departments } = req.body;

        const departmentsArray = JSON.parse(departments)

        const workflow = await Workflow.create({
            name,
            description
        })

        for (let i = 0; i < departmentsArray.length; i++) {
            const department = departmentsArray[i];
            const departmentModal = await Department.findOne({ where: { name: department } });
            await WorkflowDepratment.create({
                workflowId: workflow.id,
                departmentId: departmentModal?.id
            })
        }

        const startStep = await Step.findOne({ where: { type: 'start' } });
        const endStep = await Step.findOne({ where: { type: 'end' } });

        const workflowStartStep = await WorkflowStep.create({
            workflowId: workflow.id,
            stepId: startStep?.id,
            position_x: -400
        })

        const workflowEndStep = await WorkflowStep.create({
            workflowId: workflow.id,
            stepId: endStep?.id,
            position_x: 400
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
        const workflows = await Workflow.findAll()

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

export const getPublishedWorkflows: RequestHandler = async (req, res) => {
    try {
        const workflows = await Workflow.findAll({
            where: { published: true }
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
        const workflowId = req.params.workflowId;

        const workflow = await Workflow.findOne({
            where: { id: workflowId },
            include: [{
                model: WorkflowStep,
                as: 'steps',
                attributes: ['id', [Sequelize.literal(`JSON_OBJECT('x', position_x, 'y', position_y)`), 'position'], [Sequelize.literal(`JSON_OBJECT('name', \`steps\`.\`name\`, 'assignees', assigneesDesignation, 'description', \`steps\`.\`description\`)`), 'data']],
                include: [{
                    model: Step
                }]
            }, {
                model: Department
            }, {
                model: WorkflowEdge,
                attributes: ['id', ['workflowSourceStepId', 'source'], ['workflowTargetStepId', 'target']]
            }]
        });

        let workflowTransformed

        if (workflow) {
            // Convert the entire workflow to a plain object
            workflowTransformed = workflow.get({ plain: true });

            if (workflowTransformed.steps) {
                workflowTransformed.steps = workflowTransformed.steps.map((step: any) => {
                    return {
                        ...step, // Spread the existing step properties
                        type: step.step ? step.step.type : null, // Add the type property from Step
                        id: step.id + ''
                    };
                });
            }
        }


        return res.status(200).json({
            success: true,
            message: 'Workflow successfully fetched',
            data: {
                workflow: workflowTransformed
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