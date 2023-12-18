import { Router } from "express";
import { validateAuthCode } from "../validators/auth.validators";
import { validateWorkflowId } from "../validators/workflow.validators";
import { validateJobId, validateJobStepId, validateNewJob, validateRemarks } from "../validators/job.validators";
import { approveJobTask, completeJobTask, getAllJobs, getJob, newJob, rejectJobTask } from "../controllers/job.controller";

const router = Router()

router.post('/:workflowId/new', validateAuthCode, validateWorkflowId, validateNewJob, newJob)
router.get('/all', validateAuthCode, getAllJobs)
router.get('/:jobId', validateAuthCode, validateJobId, getJob)
router.post('/:jobStepId/done', validateAuthCode, validateJobStepId, validateRemarks, completeJobTask)
router.post('/:jobStepId/approve', validateAuthCode, validateJobStepId, validateRemarks, approveJobTask)
router.post('/:jobStepId/reject', validateAuthCode, validateJobStepId, validateRemarks, rejectJobTask)

export default router;