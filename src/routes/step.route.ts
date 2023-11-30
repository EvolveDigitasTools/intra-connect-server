import { Router } from "express";
import { validateAuthCode } from "../validators/auth.validators";
import { validateNewTask } from "../validators/step.validators";
import { newStep } from "../controllers/step.controller";

const router = Router()

router.post('/:workflowId/new', validateAuthCode, validateNewTask, newStep)

export default router;