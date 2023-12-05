import { Router } from "express";
import { validateAuthCode } from "../validators/auth.validators";
import { validateWorkflowId } from "../validators/workflow.validators";
import { validateJobId, validateNewJob } from "../validators/job.validators";
import { getAllJobs, getJob, newJob } from "../controllers/job.controller";

const router = Router()

router.post('/:workflowId/new', validateAuthCode, validateWorkflowId, validateNewJob, newJob)
router.get('/all', validateAuthCode, getAllJobs)
router.get('/:jobId', validateAuthCode, validateJobId, getJob)

export default router;