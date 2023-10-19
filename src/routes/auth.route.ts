import { Router } from "express";
import { validateAuthCode, validateLogin, validateNew } from "../validators/auth.validators";
import { getAssignees, login, logout, newEmployee } from "../controllers/auth.controller";

const router = Router();

router.get('/login/:authCode', validateLogin, login);
router.post('/new', validateNew, newEmployee);
router.post('/logout', validateAuthCode, logout)
router.get('/assignees', validateAuthCode, getAssignees)

export default router;