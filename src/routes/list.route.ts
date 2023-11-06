import { Router } from "express";
import { validateAuthCode } from "../validators/auth.validators";
import { validateNewList } from "../validators/list.validators";
import { newList } from "../controllers/list.controller";

const router = Router()

router.post('/:boardId/new', validateAuthCode, validateNewList, newList)

export default router;