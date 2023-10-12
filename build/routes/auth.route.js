"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validators_1 = require("../validators/auth.validators");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.get('/login/:authCode', auth_validators_1.validateLogin, auth_controller_1.login);
exports.default = router;
