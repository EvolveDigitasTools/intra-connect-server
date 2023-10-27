"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const board_validators_1 = require("../validators/board.validators");
const board_controller_1 = require("../controllers/board.controller");
const router = (0, express_1.Router)();
router.post('/new', board_validators_1.validateNewBoard, board_controller_1.newBoard);
router.get('/:boardId', board_validators_1.validateGetBoard, board_controller_1.getBoard);
exports.default = router;
