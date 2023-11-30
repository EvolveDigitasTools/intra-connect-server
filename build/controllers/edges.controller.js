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
exports.deleteEdge = exports.newEdge = void 0;
const WorkflowEdge_1 = __importDefault(require("../models/WorkflowEdge"));
const newEdge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { source, target } = req.body;
        const workflowId = req.params.workflowId;
        const newEdge = yield WorkflowEdge_1.default.create({
            workflowId,
            workflowSourceStepId: source,
            workflowTargetStepId: target
        });
        return res.status(201).json({
            success: true,
            message: 'Workflow Edge created',
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "edges.controller.js -> updateEdges"
            },
        });
    }
});
exports.newEdge = newEdge;
const deleteEdge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const edgeId = req.params.edgeId;
        const newEdge = yield WorkflowEdge_1.default.destroy({
            where: { id: edgeId }
        });
        return res.status(201).json({
            success: true,
            message: 'Workflow Edge deleted',
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "edges.controller.js -> updateEdges"
            },
        });
    }
});
exports.deleteEdge = deleteEdge;
