import { Router } from "express";

import authRouter from "./auth.route"
import ticketRouter from "./ticket.route"
import filesRouter from "./file.route"
import departmentRouter from "./department.route"
import boardRouter from "./board.route"
import User from "../models/User";

const router = Router();

router.get("/", async (req, res) => {
	const users = await User.findAll()
	res.status(200).send("Api is working"+users.map(user => user.email).toString());
});

router.use("/auth", authRouter);
router.use("/ticket", ticketRouter);
router.use("/files", filesRouter)
router.use("/department", departmentRouter)
router.use("/board", boardRouter)

export default router;