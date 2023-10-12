import { Router } from "express";
import { validateLogin } from "../validators/auth.validators";
import { login } from "../controllers/auth.controller";

const router = Router();

router.get('/login/:authCode', validateLogin, login);

export default router;