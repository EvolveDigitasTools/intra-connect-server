interface MailDetail {
    subject: string,
    title: string,
    message: string,
    closingMessage?: string | undefined,
    priority: "high"|"normal"|"low" | undefined,
    sendTo?: string | string[],
    actionRoute?: string,
    actionText?: string
}

export const mailDetails: { [key: string]: MailDetail } = {
    'new-ticket': {
        subject: 'New Ticket Raised!!!',
        title: 'New Ticket - $title',
        message: 'A new ticket titled "$title" has been raised. Please click on the link below to check and resolve it.',
        priority: 'high',
        actionRoute: "dashboard/tickets/$ticketId",
        actionText: "Resolve Ticket"
    },
    'new-ticket-dept': {
        subject: 'New Ticket Raised!!!',
        title: 'New Ticket - $title',
        message: 'A new ticket titled "$title" has been raised. Please click on the link below to check and resolve it.',
        priority: 'high',
        actionRoute: "dashboard/tickets/$ticketId",
        actionText: "Resolve Ticket"
    },
    'new-job': {
        subject: 'New Job Started',
        title: 'New Job Created',
        message: 'A new job "$jobTitle" has been created. Please click on the link below to check and start working on it.',
        priority: 'normal',
        actionRoute: "dashboard/job/$jobId",
        actionText: "View Job"
    },
    'task-completed': {
        subject: 'Task Approval',
        title: 'Task Completed. Approval Required',
        message: 'The task in the ongoing job is completed and your approval is required. Please click on the link below to check and approve it.',
        priority: 'high',
        actionRoute: "dashboard/job/$jobId",
        actionText: "Approve Task"
    },
    'task-declined': {
        subject: 'Task Declined',
        title: 'Task Declined',
        message: 'The task completed by you has been rejected by the approver. Please look into the remarks of the approver and complete tha task by clicking on the link below:-',
        priority: 'high',
        actionRoute: "dashboard/job/$jobId",
        actionText: "Fix Task"
    },
    'task-started': {
        subject: 'Task Started',
        title: 'New Task',
        message: 'A new task is started in the ongoing job. Please check the link below and start working on it.',
        priority: 'high',
        actionRoute: "dashboard/job/$jobId",
        actionText: "View Task"
    }
}

