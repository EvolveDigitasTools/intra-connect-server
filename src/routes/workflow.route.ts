import { Router } from "express";
import { validateAuthCode } from "../validators/auth.validators";
import { validateGetWorkflow, validateNewWorkflow } from "../validators/workflow.validators";
import { getAllWorkflow, getWorkflow, newWorkflow } from "../controllers/workflow.controller";

const router = Router()

router.post('/new', validateAuthCode, validateNewWorkflow, newWorkflow)
router.get('/all', validateAuthCode, getAllWorkflow)
router.get('/:id', validateAuthCode, validateGetWorkflow, getWorkflow)

export default router;