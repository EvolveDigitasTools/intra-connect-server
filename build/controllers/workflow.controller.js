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
exports.getWorkflow = exports.getAllWorkflow = exports.newWorkflow = void 0;
const Department_1 = __importDefault(require("../models/Department"));
const Workflow_1 = __importDefault(require("../models/Workflow"));
const Step_1 = __importDefault(require("../models/Step"));
const newWorkflow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, department } = req.body;
        const selectedDepartment = yield Department_1.default.findOne({ where: { name: department } });
        const workflow = yield Workflow_1.default.create({
            name,
            description,
            departmentId: selectedDepartment === null || selectedDepartment === void 0 ? void 0 : selectedDepartment.id
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
        const workflows = yield Workflow_1.default.findAll({
            include: [{
                    model: Step_1.default,
                    as: 'steps'
                }]
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
exports.getAllWorkflow = getAllWorkflow;
const getWorkflow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workflowId = req.params.id;
        const workflow = yield Workflow_1.default.findOne({
            where: {
                id: workflowId
            }
        });
        return res.status(200).json({
            success: true,
            message: 'Workflow successfully fetched',
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
                "source": "workflow.controller.js -> getWorkflow"
            },
        });
    }
});
exports.getWorkflow = getWorkflow;
// };
