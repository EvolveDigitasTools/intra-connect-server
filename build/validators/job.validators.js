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
exports.validateJobId = exports.validateNewJob = void 0;
const joi_1 = __importDefault(require("joi"));
const Job_1 = __importDefault(require("../models/Job"));
const validateNewJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newJob = joi_1.default.object({
            name: joi_1.default.string().required(),
            nodes: joi_1.default.string()
        });
        const { nodes } = yield newJob.validateAsync(req.body);
        const nodesJSON = JSON.parse(nodes);
        const jobStep = joi_1.default.object({
            workflowStepId: joi_1.default.number().required(),
            assignees: joi_1.default.array().items(joi_1.default.string()),
            approvers: joi_1.default.array().items(joi_1.default.string()),
            timeNeeded: joi_1.default.number(),
            timeUnit: joi_1.default.string()
        });
        const jobStepsJSON = joi_1.default.array().items(jobStep);
        yield jobStepsJSON.validateAsync(nodesJSON);
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
exports.validateNewJob = validateNewJob;
const validateJobId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.jobId;
        const job = yield Job_1.default.findOne({ where: { id: jobId } });
        if (!job)
            return res.status(400).json({
                success: false,
                message: "Job with this id don't exist"
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
exports.validateJobId = validateJobId;
