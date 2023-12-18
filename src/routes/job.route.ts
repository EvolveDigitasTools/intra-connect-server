import { Router } from "express";
import { validateAuthCode } from "../validators/auth.validators";
import { validateWorkflowId } from "../validators/workflow.validators";
import { validateJobId, validateJobStepId, validateNewJob, validateRemarks } from "../validators/job.validators";
import { completeJobTask, getAllJobs, getJob, newJob } from "../controllers/job.controller";

const router = Router()

router.post('/:workflowId/new', validateAuthCode, validateWorkflowId, validateNewJob, newJob)
router.get('/all', validateAuthCode, getAllJobs)
router.get('/:jobId', validateAuthCode, validateJobId, getJob)
router.post('/:jobStepId/done', validateAuthCode, validateJobStepId, validateRemarks, completeJobTask)

export default router;