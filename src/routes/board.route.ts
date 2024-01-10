import { Router } from "express";
import { validateBoardId, validateNewBoard, validateUpdateBoard } from "../validators/board.validators";
import { getBoard, getBoards, newBoard, updateBoard } from "../controllers/board.controller";
import { validateAuthCode } from "../validators/auth.validators";

const router = Router()

router.post('/new', validateAuthCode, validateNewBoard, newBoard)
router.get('/all', validateAuthCode, getBoards)
router.get('/:boardId', validateAuthCode, validateBoardId, getBoard)
router.post('/:boardId', validateAuthCode, validateBoardId, validateUpdateBoard, updateBoard)

export default router;