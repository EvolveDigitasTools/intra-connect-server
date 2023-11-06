import { Router } from "express";
import { validateGetBoard, validateNewBoard } from "../validators/board.validators";
import { getBoard, getBoards, newBoard } from "../controllers/board.controller";
import { validateAuthCode } from "../validators/auth.validators";

const router = Router()

router.post('/new', validateAuthCode, validateNewBoard, newBoard)
router.get('/all', validateAuthCode, getBoards)
router.get('/:boardId', validateAuthCode, validateGetBoard, getBoard)

export default router;