"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWorkflowId = exports.validateNewTask = void 0;
const joi_1 = __importDefault(require("joi"));
const Workflow_1 = __importDefault(require("../models/Workflow"));
const validateNewTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateNew = joi_1.default.object({
            name: joi_1.default.string().required(),
            type: joi_1.default.string(),
            description: joi_1.default.string().required(),
            assigneesDesignation: joi_1.default.string().required()
        });
        yield validateNew.validateAsync(req.body);
        const workflowId = req.params.workflowId;
        const workflow = yield Workflow_1.default.findOne({ where: { id: workflowId } });
        if (!workflow)
            return res.status(400).json({
                success: false,
                message: 'Workflow not found with the given id'
            });
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateNewTask = validateNewTask;
const validateWorkflowId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workflowId = req.params.workflowId;
        const workflow = yield Workflow_1.default.findOne({ where: { id: workflowId } });
        if (!workflow)
            return res.status(400).json({
                success: false,
                message: 'Workflow not found with the given id'
            });
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateWorkflowId = validateWorkflowId;
