import { Router } from "express";
import { validateAuthCode } from "../validators/auth.validators";
import { validateGetTicket, validateNew } from "../validators/ticket.validators";
import { getTickets, newTicket, getTicket } from "../controllers/ticket.controller";

const router = Router();

router.post('/new', validateAuthCode, validateNew, newTicket);
router.get('/all', validateAuthCode, getTickets)
router.get('/:ticketId', validateAuthCode, validateGetTicket, getTicket)

export default router;