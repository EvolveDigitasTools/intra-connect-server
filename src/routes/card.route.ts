import { Router } from "express";
import { validateAuthCode } from "../validators/auth.validators";
import { validateNewCard } from "../validators/card.validators";
import { newCard } from "../controllers/card.controller";

const router = Router()

router.post('/:listId/new', validateAuthCode, validateNewCard, newCard)

export default router;