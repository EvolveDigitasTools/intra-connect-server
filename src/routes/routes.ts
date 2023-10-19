import { Router } from "express";

import authRouter from "./auth.route"
import ticketRouter from "./ticket.route"
import filesRouter from "./file.route"

const router = Router();

router.get("/", (req, res) => {
	res.status(200).send("Api is working");
});

router.use("/auth", authRouter);
router.use("/ticket", ticketRouter);
router.use("/files", filesRouter)
export default router;