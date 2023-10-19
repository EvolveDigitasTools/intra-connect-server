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
    }
}

