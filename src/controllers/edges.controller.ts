import { RequestHandler } from "express";
import WorkflowEdge from "../models/WorkflowEdge";

export const newEdge: RequestHandler = async (req, res) => {
    try {
        const { source, target } = req.body;
        const workflowId = req.params.workflowId
        const newEdge = await WorkflowEdge.create({
            workflowId,
            workflowSourceStepId: source,
            workflowTargetStepId: target
        })

        return res.status(201).json({
            success: true,
            message: 'Workflow Edge created',
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "edges.controller.js -> updateEdges"
            },
        });
    }
};

export const deleteEdge: RequestHandler = async (req, res) => {
    try {
        const edgeId = req.params.edgeId
        const newEdge = await WorkflowEdge.destroy({
            where: { id: edgeId }
        })

        return res.status(201).json({
            success: true,
            message: 'Workflow Edge deleted',
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "edges.controller.js -> updateEdges"
            },
        });
    }
};