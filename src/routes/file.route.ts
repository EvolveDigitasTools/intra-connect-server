import { Router } from "express";
import { validateGetFile } from "../validators/file.validators";
import { getFile } from "../controllers/file.controller";
import { validateAuthCode } from "../validators/auth.validators";

const router = Router();

router.get('/:id', validateAuthCode, validateGetFile, getFile);

export default router;