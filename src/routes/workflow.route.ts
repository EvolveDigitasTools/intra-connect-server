import { Router } from "express";
import { validateAuthCode } from "../validators/auth.validators";
import { validateNewWorkflow } from "../validators/workflow.validators";
import { newWorkflow } from "../controllers/workflow.controller";

const router = Router()

router.post('/new', validateAuthCode, validateNewWorkflow, newWorkflow)

export default router;