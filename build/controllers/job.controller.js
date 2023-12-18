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
exports.rejectJobTask = exports.approveJobTask = exports.completeJobTask = exports.getJob = exports.getAllJobs = exports.newJob = void 0;
const Job_1 = __importDefault(require("../models/workflows/jobs/Job"));
const JobStep_1 = __importDefault(require("../models/workflows/jobs/JobStep"));
const functions_1 = require("../utils/functions");
const JobStepUser_1 = __importDefault(require("../models/workflows/jobs/JobStepUser"));
const User_1 = __importDefault(require("../models/auth/User"));
const JobStepDepartment_1 = __importDefault(require("../models/workflows/jobs/JobStepDepartment"));
const Department_1 = __importDefault(require("../models/auth/Department"));
const Workflow_1 = __importDefault(require("../models/workflows/workflows/Workflow"));
const UserDepartment_1 = __importDefault(require("../models/auth/UserDepartment"));
const WorkflowStep_1 = __importDefault(require("../models/workflows/workflows/WorkflowStep"));
const WorkflowEdge_1 = __importDefault(require("../models/workflows/workflows/WorkflowEdge"));
const mail_service_1 = require("../utils/mail.service");
const JobStepActions_1 = __importDefault(require("../models/workflows/jobs/JobStepActions"));
const sequelize_1 = require("sequelize");
const newJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, nodes } = req.body;
        const workflowId = req.params.workflowId;
        const nodesJSON = JSON.parse(nodes);
        const workflow = yield Workflow_1.default.findOne({
            where: { id: workflowId },
            include: [{
                    model: Department_1.default,
                    include: [{
                            model: UserDepartment_1.default,
                            where: {
                                isAdmin: true
                            },
                            include: [{
                                    model: User_1.default
                                }]
                        }]
                }]
        });
        const workflowStartStep = yield WorkflowStep_1.default.findOne({ where: { workflowId, stepId: 2 } });
        const workflowInitialSteps = yield WorkflowEdge_1.default.findAll({ where: { workflowId, workflowSourceStepId: workflowStartStep === null || workflowStartStep === void 0 ? void 0 : workflowStartStep.id } });
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
        let mailSent, newJobMailList = [];
        workflow === null || workflow === void 0 ? void 0 : workflow.departments.forEach(department => {
            newJobMailList.push(...department.users.map(userDepartment => { var _a; return (_a = userDepartment.user) === null || _a === void 0 ? void 0 : _a.email; }));
        });
        for (let i = 0; i < workflowInitialSteps.length; i++) {
            const workflowInitialStep = workflowInitialSteps[i];
            const jobStep = yield JobStep_1.default.findOne({
                where: { jobId: job.id, workflowStepId: workflowInitialStep.workflowTargetStepId }, include: [{
                        model: JobStepUser_1.default,
                        include: [{
                                model: User_1.default
                            }]
                    }, {
                        model: JobStepDepartment_1.default,
                        include: [{
                                model: Department_1.default,
                                // include: [{
                                //     model: UserDepartment,
                                //     where: {
                                //         isAdmin: true
                                //     },
                                //     include: [{
                                //         model: User
                                //     }]
                                // }]
                            }]
                    }]
            });
            const jobStepAssigneesUsers = jobStep === null || jobStep === void 0 ? void 0 : jobStep.users.filter(user => user.role == 'assignee').map(jobStepUser => { return jobStepUser.user.email; });
            // const jobStepAssigneesDepartmentsUsers = jobStep?.departments.filter(department => department.role == 'assignee').map(jobStepDepartment => { return jobStepDepartment.department.users })
            if (jobStepAssigneesUsers)
                newJobMailList.push(...jobStepAssigneesUsers);
            // jobStepAssigneesDepartmentsUsers?.forEach(jobStepAssigneeDepartmentUsers => {
            //     newJobMailList.push(...jobStepAssigneeDepartmentUsers.filter(jobStepUser => jobStepUser.isAdmin == true).map(departmentUser => { return departmentUser.user?.email }))
            // })
            newJobMailList = Array.from(new Set(newJobMailList));
        }
        for (let i = 0; i < newJobMailList.length; i++) {
            const newJobMail = newJobMailList[i];
            const variables = {
                jobTitle: job.name,
                jobId: job.id
            };
            mailSent = yield (0, mail_service_1.sendMailSetup)('new-job', newJobMail, variables);
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
                                    attributes: ['email']
                                }]
                        }, {
                            model: JobStepDepartment_1.default,
                            include: [{
                                    model: Department_1.default
                                }]
                        }, {
                            model: JobStepActions_1.default
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
const completeJobTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const jobStepId = req.params.jobStepId;
        const { remarks } = req.body;
        const user = yield User_1.default.findOne({ where: { accessToken: (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1] } });
        yield JobStepActions_1.default.create({
            jobStepId,
            actionType: 'done',
            actionMessage: remarks,
            actionUserId: user === null || user === void 0 ? void 0 : user.id
        });
        const jobStep = yield JobStep_1.default.findOne({
            where: {
                id: jobStepId
            },
            include: {
                model: JobStepUser_1.default,
                where: {
                    role: 'approver'
                },
                include: [{
                        model: User_1.default
                    }]
            }
        });
        const jobApprovers = jobStep === null || jobStep === void 0 ? void 0 : jobStep.users.map(jobStepUser => {
            return jobStepUser.user.email;
        });
        const variables = {
            jobId: (_b = jobStep === null || jobStep === void 0 ? void 0 : jobStep.jobId) !== null && _b !== void 0 ? _b : 0
        };
        yield (0, mail_service_1.sendMailSetup)('task-completed', jobApprovers, variables);
        return res.status(200).json({
            success: true,
            message: 'job task completed successfully',
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "job.controller.js -> completeJobTask"
            },
        });
    }
});
exports.completeJobTask = completeJobTask;
const approveJobTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    try {
        const jobStepId = req.params.jobStepId;
        const { remarks } = req.body;
        const user = yield User_1.default.findOne({ where: { accessToken: (_c = req.header('Authorization')) === null || _c === void 0 ? void 0 : _c.split(' ')[1] } });
        yield JobStepActions_1.default.create({
            jobStepId,
            actionType: 'approved',
            actionMessage: remarks,
            actionUserId: user === null || user === void 0 ? void 0 : user.id
        });
        const jobStep = yield JobStep_1.default.findOne({
            where: {
                id: jobStepId
            }
        });
        const variables = {
            jobId: (_d = jobStep === null || jobStep === void 0 ? void 0 : jobStep.jobId) !== null && _d !== void 0 ? _d : 0
        };
        const nextStepsRelations = yield WorkflowEdge_1.default.findAll({
            where: {
                workflowSourceStepId: jobStep === null || jobStep === void 0 ? void 0 : jobStep.workflowStepId
            }
        });
        const readyToStartStepsRelation = [];
        for (let i = 0; i < nextStepsRelations.length; i++) {
            const nextStepRelation = nextStepsRelations[i];
            const previousStepRelations = yield WorkflowEdge_1.default.findAll({
                where: {
                    workflowTargetStepId: nextStepRelation.workflowTargetStepId,
                    workflowSourceStepId: {
                        [sequelize_1.Op.ne]: nextStepRelation.workflowSourceStepId
                    }
                }
            });
            let readyToStart = true;
            for (let j = 0; j < previousStepRelations.length; j++) {
                const previousStepRelation = previousStepRelations[j];
                const previousJobStep = yield JobStep_1.default.findOne({
                    where: {
                        jobId: jobStep === null || jobStep === void 0 ? void 0 : jobStep.jobId,
                        workflowStepId: previousStepRelation.workflowSourceStepId
                    },
                    include: {
                        model: JobStepActions_1.default,
                        where: {
                            actionType: 'approved'
                        }
                    }
                });
                if (((_e = previousJobStep === null || previousJobStep === void 0 ? void 0 : previousJobStep.stepActions.length) !== null && _e !== void 0 ? _e : 0) < 1) {
                    readyToStart = false;
                    break;
                }
            }
            if (readyToStart)
                readyToStartStepsRelation.push(nextStepRelation);
        }
        for (let i = 0; i < readyToStartStepsRelation.length; i++) {
            const readyToStartStepRelation = readyToStartStepsRelation[i];
            const nextJobStep = yield JobStep_1.default.findOne({
                where: {
                    workflowStepId: readyToStartStepRelation.workflowTargetStepId
                },
                include: {
                    model: JobStepUser_1.default,
                    where: {
                        role: 'assignee'
                    },
                    include: [{
                            model: User_1.default
                        }]
                }
            });
            const jobAssignees = nextJobStep === null || nextJobStep === void 0 ? void 0 : nextJobStep.users.map(jobStepUser => {
                return jobStepUser.user.email;
            });
            yield (0, mail_service_1.sendMailSetup)('task-started', jobAssignees, variables);
        }
        return res.status(200).json({
            success: true,
            message: 'job task approved successfully'
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "job.controller.js -> approveJobTask"
            },
        });
    }
});
exports.approveJobTask = approveJobTask;
const rejectJobTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    try {
        const jobStepId = req.params.jobStepId;
        const { remarks } = req.body;
        const user = yield User_1.default.findOne({ where: { accessToken: (_f = req.header('Authorization')) === null || _f === void 0 ? void 0 : _f.split(' ')[1] } });
        yield JobStepActions_1.default.create({
            jobStepId,
            actionType: 'declined',
            actionMessage: remarks,
            actionUserId: user === null || user === void 0 ? void 0 : user.id
        });
        const jobStep = yield JobStep_1.default.findOne({
            where: {
                id: jobStepId
            },
            include: {
                model: JobStepUser_1.default,
                where: {
                    role: 'assignee'
                },
                include: [{
                        model: User_1.default
                    }]
            }
        });
        const jobAssignees = jobStep === null || jobStep === void 0 ? void 0 : jobStep.users.map(jobStepUser => {
            return jobStepUser.user.email;
        });
        const variables = {
            jobId: (_g = jobStep === null || jobStep === void 0 ? void 0 : jobStep.jobId) !== null && _g !== void 0 ? _g : 0
        };
        yield (0, mail_service_1.sendMailSetup)('task-declined', jobAssignees, variables);
        return res.status(200).json({
            success: true,
            message: 'job task declined successfully'
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "job.controller.js -> rejectJobTask"
            },
        });
    }
});
exports.rejectJobTask = rejectJobTask;
