import { Router } from "express";
import { validateAuthCode } from "../validators/auth.validators";
import { validateAddAdmin } from "../validators/department.validators";
import { addAdmin } from "../controllers/department.controller";

const router = Router();

router.post('/addAdmin', validateAuthCode, validateAddAdmin, addAdmin);

export default router;