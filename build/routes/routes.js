"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const ticket_route_1 = __importDefault(require("./ticket.route"));
const file_route_1 = __importDefault(require("./file.route"));
const department_route_1 = __importDefault(require("./department.route"));
const board_route_1 = __importDefault(require("./board.route"));
const list_route_1 = __importDefault(require("./list.route"));
const card_route_1 = __importDefault(require("./card.route"));
const workflow_route_1 = __importDefault(require("./workflow.route"));
const step_route_1 = __importDefault(require("./step.route"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send("Api is working");
}));
router.use("/auth", auth_route_1.default);
router.use("/ticket", ticket_route_1.default);
router.use("/files", file_route_1.default);
router.use("/department", department_route_1.default);
router.use("/board", board_route_1.default);
router.use("/list", list_route_1.default);
router.use("/card", card_route_1.default);
router.use("/workflow", workflow_route_1.default);
router.use("/step", step_route_1.default);
exports.default = router;
