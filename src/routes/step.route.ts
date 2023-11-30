import { Router } from "express";
import { validateAuthCode } from "../validators/auth.validators";
import { validateNewTask, validateWorkflowStepId } from "../validators/step.validators";
import { newWorkflowStep, updateWorkflowStep } from "../controllers/step.controller";

const router = Router()

router.post('/:workflowId/new', validateAuthCode, validateNewTask, newWorkflowStep)
router.put('/:workflowStepId', validateAuthCode, validateWorkflowStepId, updateWorkflowStep)

export default router;