"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = __importDefault(require("../models/auth/User"));
const mysql = __importStar(require("mysql2"));
const Department_1 = __importDefault(require("../models/auth/Department"));
const UserDepartment_1 = __importDefault(require("../models/auth/UserDepartment"));
const DepartmentTicket_1 = __importDefault(require("../models/tickets/DepartmentTicket"));
const File_1 = __importDefault(require("../models/utils/File"));
const Ticket_1 = __importDefault(require("../models/tickets/Ticket"));
const TicketChat_1 = __importDefault(require("../models/tickets/TicketChat"));
const UserTicket_1 = __importDefault(require("../models/tickets/UserTicket"));
const Board_1 = __importDefault(require("../models/boards/Board"));
const Card_1 = __importDefault(require("../models/boards/Card"));
const DepartmentBoard_1 = __importDefault(require("../models/boards/DepartmentBoard"));
const List_1 = __importDefault(require("../models/boards/List"));
const UserBoard_1 = __importDefault(require("../models/boards/UserBoard"));
const Workflow_1 = __importDefault(require("../models/workflows/workflows/Workflow"));
const Step_1 = __importDefault(require("../models/workflows/Step"));
const WorkflowStep_1 = __importDefault(require("../models/workflows/workflows/WorkflowStep"));
const WorkflowEdge_1 = __importDefault(require("../models/workflows/workflows/WorkflowEdge"));
const Job_1 = __importDefault(require("../models/workflows/jobs/Job"));
const JobStep_1 = __importDefault(require("../models/workflows/jobs/JobStep"));
const JobStepDepartment_1 = __importDefault(require("../models/workflows/jobs/JobStepDepartment"));
const JobStepUser_1 = __importDefault(require("../models/workflows/jobs/JobStepUser"));
const JobStepActions_1 = __importDefault(require("../models/workflows/jobs/JobStepActions"));
const WorkflowDepartment_1 = __importDefault(require("../models/workflows/workflows/WorkflowDepartment"));
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    dialectModule: mysql,
    host: '62.72.3.60',
    username: 'intra-admin',
    password: 'u@qym73ooE9uM*',
    database: 'intra_connect',
    // database: 'intra_test',
    port: 3306,
    models: [User_1.default, Department_1.default, UserDepartment_1.default, DepartmentTicket_1.default, File_1.default, Ticket_1.default, TicketChat_1.default, UserTicket_1.default, Board_1.default, Card_1.default, DepartmentBoard_1.default, List_1.default, UserBoard_1.default, Workflow_1.default, Step_1.default, WorkflowStep_1.default, WorkflowEdge_1.default, Job_1.default, JobStep_1.default, JobStepDepartment_1.default, JobStepUser_1.default, JobStepActions_1.default, WorkflowDepartment_1.default]
});
// connection.sync({ alter: true });  // Use cautiously
exports.default = connection;
