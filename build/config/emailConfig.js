"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailDetails = void 0;
exports.mailDetails = {
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
};
