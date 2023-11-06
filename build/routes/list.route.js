"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validators_1 = require("../validators/auth.validators");
const list_validators_1 = require("../validators/list.validators");
const list_controller_1 = require("../controllers/list.controller");
const router = (0, express_1.Router)();
router.post('/:boardId/new', auth_validators_1.validateAuthCode, list_validators_1.validateNewList, list_controller_1.newList);
exports.default = router;
