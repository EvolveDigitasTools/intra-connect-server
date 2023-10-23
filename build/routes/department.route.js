"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validators_1 = require("../validators/auth.validators");
const department_validators_1 = require("../validators/department.validators");
const department_controller_1 = require("../controllers/department.controller");
const router = (0, express_1.Router)();
router.post('/addAdmin', auth_validators_1.validateAuthCode, department_validators_1.validateAddAdmin, department_controller_1.addAdmin);
exports.default = router;
