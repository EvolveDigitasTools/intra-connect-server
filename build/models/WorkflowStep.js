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
const Step_1 = __importDefault(require("./Step"));
let WorkflowStep = class WorkflowStep extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    })
], WorkflowStep.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Workflow_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], WorkflowStep.prototype, "workflowId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Step_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], WorkflowStep.prototype, "stepId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], WorkflowStep.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], WorkflowStep.prototype, "assigneesDesignation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], WorkflowStep.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], WorkflowStep.prototype, "position_x", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], WorkflowStep.prototype, "position_y", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Step_1.default)
], WorkflowStep.prototype, "step", void 0);
WorkflowStep = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'workflow_step',
    })
], WorkflowStep);
exports.default = WorkflowStep;
