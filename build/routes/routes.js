"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const ticket_route_1 = __importDefault(require("./ticket.route"));
const file_route_1 = __importDefault(require("./file.route"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.status(200).send("Api is working");
});
router.use("/auth", auth_route_1.default);
router.use("/ticket", ticket_route_1.default);
router.use("/files", file_route_1.default);
exports.default = router;
