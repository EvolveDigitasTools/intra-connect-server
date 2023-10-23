import { Router } from "express";
import { validateAuthCode } from "../validators/auth.validators";
import { validateGetTicket, validateNew, validateNewChat } from "../validators/ticket.validators";
import { getTickets, newTicket, getTicket, newChat, getChats } from "../controllers/ticket.controller";

const router = Router();

router.post('/new', validateAuthCode, validateNew, newTicket);
router.get('/all', validateAuthCode, getTickets)
router.get('/:ticketId', validateAuthCode, validateGetTicket, getTicket)
router.post('/:ticketId/chat', validateAuthCode, validateNewChat, newChat)
router.get('/:ticketId/chat', validateAuthCode, getChats)

export default router;