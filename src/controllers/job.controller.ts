import { RequestHandler } from "express";
import Job from "../models/workflows/jobs/Job";
import JobStep from "../models/workflows/jobs/JobStep";
import { isUser } from "../utils/functions";
import JobStepUser from "../models/workflows/jobs/JobStepUser";
import User from "../models/auth/User";
import JobStepDepartment from "../models/workflows/jobs/JobStepDepartment";
import Department from "../models/auth/Department";

export const newJob: RequestHandler = async (req, res) => {
    try {
        const { name, nodes } = req.body;
        const workflowId = req.params.workflowId;
        const nodesJSON = JSON.parse(nodes);

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
                    }]
                }, {
                    model: JobStepDepartment,
                    include: [{
                        model: Department
                    }]
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