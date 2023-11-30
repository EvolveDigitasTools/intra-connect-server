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
const Department_1 = __importDefault(require("./Department"));
const WorkflowStep_1 = require("./WorkflowStep");
let Workflow = class Workflow extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    })
], Workflow.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], Workflow.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], Workflow.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN
    })
], Workflow.prototype, "published", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Department_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    })
], Workflow.prototype, "departmentId", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => WorkflowStep_1.WorkflowStep)
], Workflow.prototype, "steps", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Department_1.default)
], Workflow.prototype, "department", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => WorkflowStep_1.WorkflowStep)
], Workflow.prototype, "startStep", void 0);
Workflow = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'workflow',
        timestamps: true
    })
], Workflow);
exports.default = Workflow;
