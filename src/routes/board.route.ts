import { Router } from "express";
import { validateGetBoard, validateNewBoard } from "../validators/board.validators";
import { getBoard, newBoard } from "../controllers/board.controller";

const router = Router()

router.post('/new', validateNewBoard, newBoard)
router.get('/:boardId', validateGetBoard, getBoard)

export default router;