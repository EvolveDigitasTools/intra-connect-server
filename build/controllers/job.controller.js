"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJob = exports.getAllJobs = exports.newJob = void 0;
const Job_1 = __importDefault(require("../models/workflows/jobs/Job"));
const JobStep_1 = __importDefault(require("../models/workflows/jobs/JobStep"));
const functions_1 = require("../utils/functions");
const JobStepUser_1 = __importDefault(require("../models/workflows/jobs/JobStepUser"));
const User_1 = __importDefault(require("../models/auth/User"));
const JobStepDepartment_1 = __importDefault(require("../models/workflows/jobs/JobStepDepartment"));
const Department_1 = __importDefault(require("../models/auth/Department"));
const newJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, nodes } = req.body;
        const workflowId = req.params.workflowId;
        const nodesJSON = JSON.parse(nodes);
        const job = yield Job_1.default.create({
            name,
            workflowId
        });
        for (let i = 0; i < nodesJSON.length; i++) {
            const node = nodesJSON[i];
            const jobStep = yield JobStep_1.default.create({
                jobId: job.id,
                workflowStepId: node.workflowStepId,
                timeNeeded: node.timeNeeded,
                timeUnit: node.timeUnit
            });
            for (let j = 0; j < node.assignees.length; j++) {
                const nodeAssignee = node.assignees[j];
                yield createJobStepHandlers(true, nodeAssignee, jobStep.id);
            }
            for (let j = 0; j < node.approvers.length; j++) {
                const nodeApprover = node.approvers[j];
                yield createJobStepHandlers(false, nodeApprover, jobStep.id);
            }
        }
        return res.status(201).json({
            success: true,
            message: 'Job successfully created',
            data: {
                job
            }
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "job.controller.js -> newJob"
            },
        });
    }
});
exports.newJob = newJob;
const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield Job_1.default.findAll();
        return res.status(200).json({
            success: true,
            message: 'Jobs successfully fetched',
            data: {
                jobs
            }
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "job.controller.js -> getAllJobs"
            },
        });
    }
});
exports.getAllJobs = getAllJobs;
const getJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.jobId;
        let jobTransfarmed;
        const job = yield Job_1.default.findOne({
            where: { id: jobId },
            include: [{
                    model: JobStep_1.default,
                    attributes: ['id', 'timeNeeded', 'timeUnit', 'workflowStepId'],
                    include: [{
                            model: JobStepUser_1.default,
                            attributes: ['role'],
                            include: [{
                                    model: User_1.default,
                                }]
                        }, {
                            model: JobStepDepartment_1.default,
                            include: [{
                                    model: Department_1.default
                                }]
                        }]
                }]
        });
        if (job) {
            // Convert the entire workflow to a plain object
            jobTransfarmed = job.get({ plain: true });
            if (jobTransfarmed.steps) {
                jobTransfarmed.steps = jobTransfarmed.steps.map((step) => {
                    return Object.assign(Object.assign({}, step), { assignees: step.users.filter((user) => user.role == 'assignee').map((user) => { return user.user.email; }), approvers: step.users.filter((user) => user.role == 'approver').map((user) => { return user.user.email; }) });
                });
            }
        }
        return res.status(200).json({
            success: true,
            message: 'Job successfully fetched',
            data: {
                job: jobTransfarmed
            }
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "job.controller.js -> getJob"
            },
        });
    }
});
exports.getJob = getJob;
const createJobStepHandlers = (isAssignee, handler, jobStepId) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, functions_1.isUser)(handler)) {
        const user = yield User_1.default.findOne({ where: { email: handler } });
        yield JobStepUser_1.default.create({
            userId: user === null || user === void 0 ? void 0 : user.id,
            jobStepId,
            role: isAssignee ? 'assignee' : 'approver'
        });
    }
    else {
        const department = yield Department_1.default.findOne({ where: { name: handler } });
        yield JobStepDepartment_1.default.create({
            departmentId: department === null || department === void 0 ? void 0 : department.id,
            jobStepId,
            role: isAssignee ? 'assignee' : 'approver'
        });
    }
});
