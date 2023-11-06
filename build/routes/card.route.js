"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validators_1 = require("../validators/auth.validators");
const card_validators_1 = require("../validators/card.validators");
const card_controller_1 = require("../controllers/card.controller");
const router = (0, express_1.Router)();
router.post('/:listId/new', auth_validators_1.validateAuthCode, card_validators_1.validateNewCard, card_controller_1.newCard);
exports.default = router;
