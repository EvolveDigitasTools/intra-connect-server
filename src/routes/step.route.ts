import { Router } from "express";
import { validateAuthCode } from "../validators/auth.validators";
import { validateGetWorkflow, validateNewWorkflow } from "../validators/workflow.validators";
import { getAllWorkflow, getWorkflow, newWorkflow } from "../controllers/workflow.controller";
import { validateNewTask, validateWorkflowId } from "../validators/step.validators";
import { newStep } from "../controllers/step.controller";

const router = Router()

router.post('/:workflowId/new', validateAuthCode, validateNewTask, newStep)
// router.get('/:workflowId/all', validateAuthCode, validateWorkflowId, getAllWorkflow)
// router.get('/:id', validateAuthCode, validateGetWorkflow, getWorkflow)

export default router;