"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sku_validators_1 = require("../validators/sku.validators");
const sku_controller_1 = require("../controllers/sku.controller");
const router = (0, express_1.Router)();
router.post('/new', sku_validators_1.validateNew, sku_controller_1.skuRegistration);
router.post('/send-verify-mail', sku_validators_1.validateSendVerify, sku_controller_1.sendVerifyMail);
router.get('/unverified/:vendorCode', sku_validators_1.validateVendorCode, sku_controller_1.getUnverifiedSKUs);
router.post('/review', sku_validators_1.validateReview, sku_controller_1.applyReview);
exports.default = router;