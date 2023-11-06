"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_validators_1 = require("../validators/file.validators");
const file_controller_1 = require("../controllers/file.controller");
const auth_validators_1 = require("../validators/auth.validators");
const router = (0, express_1.Router)();
router.get('/:id', auth_validators_1.validateAuthCode, file_validators_1.validateGetFile, file_controller_1.getFile);
exports.default = router;
