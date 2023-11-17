import { Router } from "express";

import authRouter from "./auth.route"
import ticketRouter from "./ticket.route"
import filesRouter from "./file.route"
import departmentRouter from "./department.route"
import boardRouter from "./board.route"
import listRouter from "./list.route"
import cardRouter from "./card.route"
import workflowRouter from "./workflow.route"

import User from "../models/User";

const router = Router();

router.get("/", async (req, res) => {
	res.status(200).send("Api is working");
});

router.use("/auth", authRouter);
router.use("/ticket", ticketRouter);
router.use("/files", filesRouter)
router.use("/department", departmentRouter)
router.use("/board", boardRouter)
router.use("/list", listRouter)
router.use("/card", cardRouter)
router.use("/workflow", workflowRouter)

export default router;