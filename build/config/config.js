"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const dotenv_extended_1 = require("dotenv-extended");
(0, dotenv_1.config)(); // Load common configurations from .env
console.log('hi', process.env.NODE_ENV, process.env.AUTH_CLIENT_ID);
(0, dotenv_extended_1.load)({
    schema: '.env',
    errorOnMissing: false,
    includeProcessEnv: true,
    silent: false,
    path: `.env.${process.env.NODE_ENV}`
});
