"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Workflow_1 = __importDefault(require("./Workflow"));
const WorkflowStep_1 = __importDefault(require("./WorkflowStep"));
let WorkflowEdge = class WorkflowEdge extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    })
], WorkflowEdge.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Workflow_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], WorkflowEdge.prototype, "workflowId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => WorkflowStep_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], WorkflowEdge.prototype, "workflowSourceStepId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => WorkflowStep_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], WorkflowEdge.prototype, "workflowTargetStepId", void 0);
WorkflowEdge = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'workflow_edge',
    })
], WorkflowEdge);
exports.default = WorkflowEdge;
