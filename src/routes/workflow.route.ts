import { Router } from "express";
import { validateAuthCode } from "../validators/auth.validators";
import { validateNewWorkflow, validateWorkflowId } from "../validators/workflow.validators";
import { getAllWorkflow, getWorkflow, newWorkflow } from "../controllers/workflow.controller";

const router = Router()

router.post('/new', validateAuthCode, validateNewWorkflow, newWorkflow)
router.get('/all', validateAuthCode, getAllWorkflow)
router.get('/:workflowId', validateAuthCode, validateWorkflowId, getWorkflow)

export default router;