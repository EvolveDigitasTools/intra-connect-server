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
const Job_1 = __importDefault(require("./Job"));
const WorkflowStep_1 = __importDefault(require("./WorkflowStep"));
const JobStepUser_1 = __importDefault(require("./JobStepUser"));
const JobStepDepartment_1 = __importDefault(require("./JobStepDepartment"));
let JobStep = class JobStep extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    })
], JobStep.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Job_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], JobStep.prototype, "jobId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => WorkflowStep_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], JobStep.prototype, "workflowStepId", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => JobStepUser_1.default)
], JobStep.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => JobStepDepartment_1.default)
], JobStep.prototype, "departments", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], JobStep.prototype, "timeNeeded", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], JobStep.prototype, "timeUnit", void 0);
JobStep = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'job_step',
        timestamps: false
    })
], JobStep);
exports.default = JobStep;
