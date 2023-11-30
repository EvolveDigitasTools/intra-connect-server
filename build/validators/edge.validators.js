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
exports.validateEdgeId = exports.validateNewEdge = void 0;
const joi_1 = __importDefault(require("joi"));
const WorkflowStep_1 = __importDefault(require("../models/WorkflowStep"));
const WorkflowEdge_1 = __importDefault(require("../models/WorkflowEdge"));
const validateNewEdge = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateNew = joi_1.default.object({
            source: joi_1.default.number().required(),
            target: joi_1.default.number().required(),
        });
        const { source, target } = yield validateNew.validateAsync(req.body);
        const sourceWorkflowStep = yield WorkflowStep_1.default.findOne({ where: { id: source } });
        const targetWorkflowStep = yield WorkflowStep_1.default.findOne({ where: { id: target } });
        if (!(sourceWorkflowStep && targetWorkflowStep))
            return res.status(400).json({
                success: false,
                message: "source or target id incorrect"
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
exports.validateNewEdge = validateNewEdge;
const validateEdgeId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workflowEdge = yield WorkflowEdge_1.default.findOne({ where: { id: Number(req.params.edgeId) } });
        if (!workflowEdge)
            return res.status(400).json({
                success: false,
                message: "workflow edge with this id doesn't exist"
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
exports.validateEdgeId = validateEdgeId;
