import { Router } from "express";
import { validateAuthCode } from "../validators/auth.validators";
import { validateWorkflowId } from "../validators/workflow.validators";
import { deleteEdge, newEdge } from "../controllers/edges.controller";
import { validateEdgeId, validateNewEdge } from "../validators/edge.validators";

const router = Router()

router.post('/:workflowId/', validateAuthCode, validateWorkflowId, validateNewEdge, newEdge)
router.delete('/:edgeId/', validateAuthCode, validateEdgeId, deleteEdge)

export default router;