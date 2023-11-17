"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validators_1 = require("../validators/auth.validators");
const workflow_validators_1 = require("../validators/workflow.validators");
const workflow_controller_1 = require("../controllers/workflow.controller");
const router = (0, express_1.Router)();
router.post('/new', auth_validators_1.validateAuthCode, workflow_validators_1.validateNewWorkflow, workflow_controller_1.newWorkflow);
exports.default = router;
