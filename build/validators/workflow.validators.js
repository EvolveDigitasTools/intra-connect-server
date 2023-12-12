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
exports.validateWorkflowId = exports.validateNewWorkflow = void 0;
const joi_1 = __importDefault(require("joi"));
const Department_1 = __importDefault(require("../models/auth/Department"));
const Workflow_1 = __importDefault(require("../models/workflows/workflows/Workflow"));
const validateNewWorkflow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newWorkflow = joi_1.default.object({
            name: joi_1.default.string().required(),
            description: joi_1.default.string(),
            departments: joi_1.default.string().required()
        });
        const { departments } = yield newWorkflow.validateAsync(req.body);
        const departmentsArray = JSON.parse(departments);
        for (let i = 0; i < departmentsArray.length; i++) {
            const department = departmentsArray[i];
            const isDepartmentExist = yield Department_1.default.findOne({ where: { name: department } });
            if (!isDepartmentExist)
                return res.status(400).json({
                    success: false,
                    message: "Department with the given name doesn't exist"
                });
        }
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
exports.validateNewWorkflow = validateNewWorkflow;
const validateWorkflowId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workflowId = req.params.workflowId;
        const workflow = yield Workflow_1.default.findOne({ where: { id: workflowId } });
        if (!workflow)
            return res.status(400).json({
                success: false,
                message: "Workflow with this id don't exist"
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
