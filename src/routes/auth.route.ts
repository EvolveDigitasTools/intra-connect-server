import { Router } from "express";
import { validateLogin, validateNew } from "../validators/auth.validators";
import { login, newEmployee } from "../controllers/auth.controller";

const router = Router();

router.get('/login/:authCode', validateLogin, login);
router.post('/new', validateNew, newEmployee)

export default router;