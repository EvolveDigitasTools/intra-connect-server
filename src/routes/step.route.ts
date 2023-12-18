import { Router } from "express";
import { validateAuthCode } from "../validators/auth.validators";
import { validateNewTask, validateStepUpdate, validateWorkflowStepId } from "../validators/step.validators";
import { deleteWorkflowStep, newWorkflowStep, updateWorkflowStep } from "../controllers/step.controller";

const router = Router()

router.post('/:workflowId/new', validateAuthCode, validateNewTask, newWorkflowStep)
router.put('/:workflowStepId', validateAuthCode, validateWorkflowStepId, validateStepUpdate, updateWorkflowStep)
router.delete('/:workflowStepId', validateAuthCode, validateWorkflowStepId, deleteWorkflowStep)

export default router;