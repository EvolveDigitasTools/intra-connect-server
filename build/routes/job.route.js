"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validators_1 = require("../validators/auth.validators");
const workflow_validators_1 = require("../validators/workflow.validators");
const job_validators_1 = require("../validators/job.validators");
const job_controller_1 = require("../controllers/job.controller");
const router = (0, express_1.Router)();
router.post('/:workflowId/new', auth_validators_1.validateAuthCode, workflow_validators_1.validateWorkflowId, job_validators_1.validateNewJob, job_controller_1.newJob);
router.get('/all', auth_validators_1.validateAuthCode, job_controller_1.getAllJobs);
router.get('/:jobId', auth_validators_1.validateAuthCode, job_validators_1.validateJobId, job_controller_1.getJob);
router.post('/:jobStepId/done', auth_validators_1.validateAuthCode, job_validators_1.validateJobStepId, job_validators_1.validateRemarks, job_controller_1.completeJobTask);
router.post('/:jobStepId/approve', auth_validators_1.validateAuthCode, job_validators_1.validateJobStepId, job_validators_1.validateRemarks, job_controller_1.approveJobTask);
router.post('/:jobStepId/reject', auth_validators_1.validateAuthCode, job_validators_1.validateJobStepId, job_validators_1.validateRemarks, job_controller_1.rejectJobTask);
exports.default = router;
