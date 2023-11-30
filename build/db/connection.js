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
const User_1 = __importDefault(require("../models/User"));
const mysql = __importStar(require("mysql2"));
const Department_1 = __importDefault(require("../models/Department"));
const UserDepartment_1 = __importDefault(require("../models/UserDepartment"));
const DepartmentTicket_1 = require("../models/DepartmentTicket");
const File_1 = __importDefault(require("../models/File"));
const Ticket_1 = __importDefault(require("../models/Ticket"));
const TicketChat_1 = __importDefault(require("../models/TicketChat"));
const UserTicket_1 = __importDefault(require("../models/UserTicket"));
const Board_1 = __importDefault(require("../models/Board"));
const Card_1 = __importDefault(require("../models/Card"));
const DepartmentBoard_1 = __importDefault(require("../models/DepartmentBoard"));
const List_1 = __importDefault(require("../models/List"));
const UserBoard_1 = __importDefault(require("../models/UserBoard"));
const Workflow_1 = __importDefault(require("../models/Workflow"));
const Step_1 = __importDefault(require("../models/Step"));
const WorkflowStep_1 = __importDefault(require("../models/WorkflowStep"));
const WorkflowEdge_1 = __importDefault(require("../models/WorkflowEdge"));
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    dialectModule: mysql,
    host: '62.72.3.60',
    username: 'intra-admin',
    password: 'intra-pass',
    database: 'intra_connect',
    port: 3306,
    models: [User_1.default, Department_1.default, UserDepartment_1.default, DepartmentTicket_1.DepartmentTicket, File_1.default, Ticket_1.default, TicketChat_1.default, UserTicket_1.default, Board_1.default, Card_1.default, DepartmentBoard_1.default, List_1.default, UserBoard_1.default, Workflow_1.default, Step_1.default, WorkflowStep_1.default, WorkflowEdge_1.default]
});
connection.sync({ alter: true }); // Use cautiously
exports.default = connection;
