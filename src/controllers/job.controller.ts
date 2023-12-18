import { RequestHandler } from "express";
import Job from "../models/workflows/jobs/Job";
import JobStep from "../models/workflows/jobs/JobStep";
import { isUser } from "../utils/functions";
import JobStepUser from "../models/workflows/jobs/JobStepUser";
import User from "../models/auth/User";
import JobStepDepartment from "../models/workflows/jobs/JobStepDepartment";
import Department from "../models/auth/Department";
import Workflow from "../models/workflows/workflows/Workflow";
import UserDepartment from "../models/auth/UserDepartment";
import WorkflowStep from "../models/workflows/workflows/WorkflowStep";
import WorkflowEdge from "../models/workflows/workflows/WorkflowEdge";
import { sendMailSetup } from "../utils/mail.service";
import JobStepAction from "../models/workflows/jobs/JobStepActions";
import { Op } from "sequelize";

export const newJob: RequestHandler = async (req, res) => {
    try {
        const { name, nodes } = req.body;
        const workflowId = req.params.workflowId;
        const nodesJSON = JSON.parse(nodes);

        const workflow = await Workflow.findOne({
            where: { id: workflowId },
            include: [{
                model: Department,
                include: [{
                    model: UserDepartment,
                    where: {
                        isAdmin: true
                    },
                    include: [{
                        model: User
                    }]
                }]
            }]
        })

        const workflowStartStep = await WorkflowStep.findOne({ where: { workflowId, stepId: 2 } })
        const workflowInitialSteps = await WorkflowEdge.findAll({ where: { workflowId, workflowSourceStepId: workflowStartStep?.id } })

        const job = await Job.create({
            name,
            workflowId
        })

        for (let i = 0; i < nodesJSON.length; i++) {
            const node = nodesJSON[i];
            const jobStep = await JobStep.create({
                jobId: job.id,
                workflowStepId: node.workflowStepId,
                timeNeeded: node.timeNeeded,
                timeUnit: node.timeUnit
            })

            for (let j = 0; j < node.assignees.length; j++) {
                const nodeAssignee = node.assignees[j];
                await createJobStepHandlers(true, nodeAssignee, jobStep.id)
            }

            for (let j = 0; j < node.approvers.length; j++) {
                const nodeApprover = node.approvers[j];
                await createJobStepHandlers(false, nodeApprover, jobStep.id)
            }
        }
        let mailSent, newJobMailList: (string | undefined)[] = []
        workflow?.departments.forEach(department => {
            newJobMailList.push(...department.users.map(userDepartment => { return userDepartment.user?.email }))
        })

        for (let i = 0; i < workflowInitialSteps.length; i++) {
            const workflowInitialStep = workflowInitialSteps[i];
            const jobStep = await JobStep.findOne({
                where: { jobId: job.id, workflowStepId: workflowInitialStep.workflowTargetStepId }, include: [{
                    model: JobStepUser,
                    include: [{
                        model: User
                    }]
                }, {
                    model: JobStepDepartment,
                    include: [{
                        model: Department,
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
            })
            const jobStepAssigneesUsers = jobStep?.users.filter(user => user.role == 'assignee').map(jobStepUser => { return jobStepUser.user.email })
            // const jobStepAssigneesDepartmentsUsers = jobStep?.departments.filter(department => department.role == 'assignee').map(jobStepDepartment => { return jobStepDepartment.department.users })
            if (jobStepAssigneesUsers)
                newJobMailList.push(...jobStepAssigneesUsers)
            // jobStepAssigneesDepartmentsUsers?.forEach(jobStepAssigneeDepartmentUsers => {
            //     newJobMailList.push(...jobStepAssigneeDepartmentUsers.filter(jobStepUser => jobStepUser.isAdmin == true).map(departmentUser => { return departmentUser.user?.email }))
            // })
            newJobMailList = Array.from(new Set(newJobMailList))
        }
        for (let i = 0; i < newJobMailList.length; i++) {
            const newJobMail = newJobMailList[i];
            const variables = {
                jobTitle: job.name,
                jobId: job.id
            }
            mailSent = await sendMailSetup('new-job', newJobMail, variables);
        }

        return res.status(201).json({
            success: true,
            message: 'Job successfully created',
            data: {
                job
            }
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "job.controller.js -> newJob"
            },
        });
    }
};

export const getAllJobs: RequestHandler = async (req, res) => {
    try {
        const jobs = await Job.findAll()

        return res.status(200).json({
            success: true,
            message: 'Jobs successfully fetched',
            data: {
                jobs
            }
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "job.controller.js -> getAllJobs"
            },
        });
    }
};

export const getJob: RequestHandler = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        let jobTransfarmed

        const job = await Job.findOne({
            where: { id: jobId },
            include: [{
                model: JobStep,
                attributes: ['id', 'timeNeeded', 'timeUnit', 'workflowStepId'],
                include: [{
                    model: JobStepUser,
                    attributes: ['role'],
                    include: [{
                        model: User,
                        attributes: ['email']
                    }]
                }, {
                    model: JobStepDepartment,
                    include: [{
                        model: Department
                    }]
                }, {
                    model: JobStepAction
                }]
            }]
        });

        if (job) {
            // Convert the entire workflow to a plain object
            jobTransfarmed = job.get({ plain: true });

            if (jobTransfarmed.steps) {
                jobTransfarmed.steps = jobTransfarmed.steps.map((step: any) => {
                    return {
                        ...step,
                        assignees: step.users.filter((user: JobStepUser) => user.role == 'assignee').map((user: JobStepUser) => { return user.user.email }),
                        approvers: step.users.filter((user: JobStepUser) => user.role == 'approver').map((user: JobStepUser) => { return user.user.email })
                    }
                });
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Job successfully fetched',
            data: {
                job: jobTransfarmed
            }
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "job.controller.js -> getJob"
            },
        });
    }
};

const createJobStepHandlers = async (isAssignee: boolean, handler: string, jobStepId: number) => {
    if (isUser(handler)) {
        const user = await User.findOne({ where: { email: handler } })
        await JobStepUser.create({
            userId: user?.id,
            jobStepId,
            role: isAssignee ? 'assignee' : 'approver'
        })
    }
    else {
        const department = await Department.findOne({ where: { name: handler } })
        await JobStepDepartment.create({
            departmentId: department?.id,
            jobStepId,
            role: isAssignee ? 'assignee' : 'approver'
        })
    }
}

export const completeJobTask: RequestHandler = async (req, res) => {
    try {
        const jobStepId = req.params.jobStepId
        const { remarks } = req.body
        const user = await User.findOne({ where: { accessToken: req.header('Authorization')?.split(' ')[1] } })

        await JobStepAction.create({
            jobStepId,
            actionType: 'done',
            actionMessage: remarks,
            actionUserId: user?.id
        })

        const jobStep = await JobStep.findOne({
            where: {
                id: jobStepId
            },
            include: {
                model: JobStepUser,
                where: {
                    role: 'approver'
                },
                include: [{
                    model: User
                }]
            }
        })

        const jobApprovers = jobStep?.users.map(jobStepUser => {
            return jobStepUser.user.email
        })
        const variables = {
            jobId: jobStep?.jobId ?? 0
        }
        await sendMailSetup('task-completed', jobApprovers, variables);

        return res.status(200).json({
            success: true,
            message: 'job task completed successfully',
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "job.controller.js -> completeJobTask"
            },
        });
    }
};

export const approveJobTask: RequestHandler = async (req, res) => {
    try {
        const jobStepId = req.params.jobStepId
        const { remarks } = req.body
        const user = await User.findOne({ where: { accessToken: req.header('Authorization')?.split(' ')[1] } })

        await JobStepAction.create({
            jobStepId,
            actionType: 'approved',
            actionMessage: remarks,
            actionUserId: user?.id
        })

        const jobStep = await JobStep.findOne({
            where: {
                id: jobStepId
            }
        })

        const variables = {
            jobId: jobStep?.jobId ?? 0
        }

        const nextStepsRelations = await WorkflowEdge.findAll({
            where: {
                workflowSourceStepId: jobStep?.workflowStepId
            }
        })

        const readyToStartStepsRelation = []

        for (let i = 0; i < nextStepsRelations.length; i++) {
            const nextStepRelation = nextStepsRelations[i];
            const previousStepRelations = await WorkflowEdge.findAll({
                where: {
                    workflowTargetStepId: nextStepRelation.workflowTargetStepId,
                    workflowSourceStepId: {
                        [Op.ne]: nextStepRelation.workflowSourceStepId
                    }
                }
            })
            let readyToStart = true;
            for (let j = 0; j < previousStepRelations.length; j++) {
                const previousStepRelation = previousStepRelations[j];
                const previousJobStep = await JobStep.findOne({
                    where: {
                        jobId: jobStep?.jobId,
                        workflowStepId: previousStepRelation.workflowSourceStepId
                    },
                    include: {
                        model: JobStepAction,
                        where: {
                            actionType: 'approved'
                        }
                    }
                })
                if((previousJobStep?.stepActions.length ?? 0) < 1){
                    readyToStart = false
                    break;
                }
            }
            if(readyToStart)
            readyToStartStepsRelation.push(nextStepRelation)
        }

        for (let i = 0; i < readyToStartStepsRelation.length; i++) {
            const readyToStartStepRelation = readyToStartStepsRelation[i];
            const nextJobStep = await JobStep.findOne({
                where: {
                    workflowStepId: readyToStartStepRelation.workflowTargetStepId
                },
                include: {
                    model: JobStepUser,
                    where: {
                        role: 'assignee'
                    },
                    include: [{
                        model: User
                    }]
                }
            })
            const jobAssignees = nextJobStep?.users.map(jobStepUser => {
                return jobStepUser.user.email
            })
            await sendMailSetup('task-started', jobAssignees, variables);
        }

        return res.status(200).json({
            success: true,
            message: 'job task approved successfully'
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "job.controller.js -> approveJobTask"
            },
        });
    }
};

export const rejectJobTask: RequestHandler = async (req, res) => {
    try {
        const jobStepId = req.params.jobStepId
        const { remarks } = req.body
        const user = await User.findOne({ where: { accessToken: req.header('Authorization')?.split(' ')[1] } })

        await JobStepAction.create({
            jobStepId,
            actionType: 'declined',
            actionMessage: remarks,
            actionUserId: user?.id
        })

        const jobStep = await JobStep.findOne({
            where: {
                id: jobStepId
            },
            include: {
                model: JobStepUser,
                where: {
                    role: 'assignee'
                },
                include: [{
                    model: User
                }]
            }
        })

        const jobAssignees = jobStep?.users.map(jobStepUser => {
            return jobStepUser.user.email
        })
        const variables = {
            jobId: jobStep?.jobId ?? 0
        }
        await sendMailSetup('task-declined', jobAssignees, variables);

        return res.status(200).json({
            success: true,
            message: 'job task declined successfully'
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "job.controller.js -> rejectJobTask"
            },
        });
    }
};