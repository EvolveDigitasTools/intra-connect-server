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
exports.updateWorkflowStep = exports.newWorkflowStep = void 0;
const Step_1 = __importDefault(require("../models/workflows/Step"));
const WorkflowStep_1 = __importDefault(require("../models/workflows/workflows/WorkflowStep"));
const newWorkflowStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, type, description, assigneesDesignation } = req.body;
        const step = yield Step_1.default.findOne({ where: { type } });
        const workflowStep = yield WorkflowStep_1.default.create({
            workflowId: Number(req.params.workflowId),
            stepId: step === null || step === void 0 ? void 0 : step.id,
            description,
            assigneesDesignation,
            name
        });
        return res.status(201).json({
            success: true,
            message: 'Workflow Step successfully created',
            data: {
                workflowStep
            }
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "step.controller.js -> newWorkflowStep"
            },
        });
    }
});
exports.newWorkflowStep = newWorkflowStep;
const updateWorkflowStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { position_x, position_y } = req.body;
        const workflowStepId = req.params.workflowStepId;
        const workflowStep = yield WorkflowStep_1.default.update({
            position_x,
            position_y
        }, { where: { id: Number(workflowStepId) } });
        return res.status(201).json({
            success: true,
            message: 'Workflow Step successfully updated',
            data: {
                workflowStep
            }
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "step.controller.js -> updateWorkflowStep"
            },
        });
    }
});
exports.updateWorkflowStep = updateWorkflowStep;
