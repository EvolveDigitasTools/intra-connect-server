"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validators_1 = require("../validators/auth.validators");
const step_validators_1 = require("../validators/step.validators");
const step_controller_1 = require("../controllers/step.controller");
const router = (0, express_1.Router)();
router.post('/:workflowId/new', auth_validators_1.validateAuthCode, step_validators_1.validateNewTask, step_controller_1.newStep);
exports.default = router;
