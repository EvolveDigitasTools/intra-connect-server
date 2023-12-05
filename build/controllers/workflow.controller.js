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
exports.getWorkflow = exports.getPublishedWorkflows = exports.getAllWorkflow = exports.newWorkflow = void 0;
const Department_1 = __importDefault(require("../models/Department"));
const Workflow_1 = __importDefault(require("../models/Workflow"));
const Step_1 = __importDefault(require("../models/Step"));
const WorkflowStep_1 = __importDefault(require("../models/WorkflowStep"));
const sequelize_typescript_1 = require("sequelize-typescript");
const WorkflowEdge_1 = __importDefault(require("../models/WorkflowEdge"));
const newWorkflow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, department } = req.body;
        const selectedDepartment = yield Department_1.default.findOne({ where: { name: department } });
        const workflow = yield Workflow_1.default.create({
            name,
            description,
            departmentId: selectedDepartment === null || selectedDepartment === void 0 ? void 0 : selectedDepartment.id
        });
        const startStep = yield Step_1.default.findOne({ where: { type: 'start' } });
        const endStep = yield Step_1.default.findOne({ where: { type: 'end' } });
        const workflowStartStep = yield WorkflowStep_1.default.create({
            workflowId: workflow.id,
            stepId: startStep === null || startStep === void 0 ? void 0 : startStep.id,
            position_x: -400
        });
        const workflowEndStep = yield WorkflowStep_1.default.create({
            workflowId: workflow.id,
            stepId: endStep === null || endStep === void 0 ? void 0 : endStep.id,
            position_x: 400
        });
        return res.status(201).json({
            success: true,
            message: 'Workflow successfully created',
            data: {
                workflow
            }
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "workflow.controller.js -> newWorkflow"
            },
        });
    }
});
exports.newWorkflow = newWorkflow;
const getAllWorkflow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workflows = yield Workflow_1.default.findAll();
        return res.status(200).json({
            success: true,
            message: 'Workflows successfully fetched',
            data: {
                workflows
            }
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "workflow.controller.js -> getAllWorkflows"
            },
        });
    }
});
exports.getAllWorkflow = getAllWorkflow;
const getPublishedWorkflows = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workflows = yield Workflow_1.default.findAll({
            where: { published: true }
        });
        return res.status(200).json({
            success: true,
            message: 'Workflows successfully fetched',
            data: {
                workflows
            }
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "workflow.controller.js -> getAllWorkflows"
            },
        });
    }
});
exports.getPublishedWorkflows = getPublishedWorkflows;
const getWorkflow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workflowId = req.params.workflowId;
        const workflow = yield Workflow_1.default.findOne({
            where: { id: workflowId },
            include: [{
                    model: WorkflowStep_1.default,
                    as: 'steps',
                    attributes: ['id', [sequelize_typescript_1.Sequelize.literal(`JSON_OBJECT('x', position_x, 'y', position_y)`), 'position'], [sequelize_typescript_1.Sequelize.literal(`JSON_OBJECT('name', \`steps\`.\`name\`, 'assignees', assigneesDesignation, 'description', \`steps\`.\`description\`)`), 'data']],
                    include: [{
                            model: Step_1.default
                        }]
                }, {
                    model: Department_1.default
                }, {
                    model: WorkflowEdge_1.default,
                    attributes: ['id', ['workflowSourceStepId', 'source'], ['workflowTargetStepId', 'target']]
                }]
        });
        let workflowTransformed;
        if (workflow) {
            // Convert the entire workflow to a plain object
            workflowTransformed = workflow.get({ plain: true });
            if (workflowTransformed.steps) {
                workflowTransformed.steps = workflowTransformed.steps.map((step) => {
                    return Object.assign(Object.assign({}, step), { type: step.step ? step.step.type : null, id: step.id + '' });
                });
            }
        }
        return res.status(200).json({
            success: true,
            message: 'Workflow successfully fetched',
            data: {
                workflow: workflowTransformed
            }
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "workflow.controller.js -> getWorkflow"
            },
        });
    }
});
exports.getWorkflow = getWorkflow;
// };
