import { Sequelize } from "sequelize-typescript";
import User from "../models/auth/User";
import * as mysql from "mysql2";
import Department from "../models/auth/Department";
import UserDepartment from "../models/auth/UserDepartment";
import DepartmentTicket from "../models/tickets/DepartmentTicket";
import File from "../models/utils/File";
import Ticket from "../models/tickets/Ticket";
import TicketChat from "../models/tickets/TicketChat";
import UserTicket from "../models/tickets/UserTicket";
import Board from "../models/boards/Board";
import Card from "../models/boards/Card";
import DepartmentBoard from "../models/boards/DepartmentBoard";
import List from "../models/boards/List";
import UserBoard from "../models/boards/UserBoard";
import Workflow from "../models/workflows/workflows/Workflow";
import Step from "../models/workflows/Step";
import WorkflowStep from "../models/workflows/workflows/WorkflowStep";
import WorkflowEdge from "../models/workflows/workflows/WorkflowEdge";
import Job from "../models/workflows/jobs/Job";
import JobStep from "../models/workflows/jobs/JobStep";
import JobStepDepartment from "../models/workflows/jobs/JobStepDepartment";
import JobStepUser from "../models/workflows/jobs/JobStepUser";
import JobStepAction from "../models/workflows/jobs/JobStepActions";
import WorkflowDepratment from "../models/workflows/workflows/WorkflowDepartment";

const connection = new Sequelize({
  dialect: "mysql",
  dialectModule: mysql,
  host: '62.72.3.60',
  username: 'intra-admin',
  password: 'u@qym73ooE9uM*',
  database: 'intra_connect', 
  // database: 'intra_test',
  port: 3306,
  models: [User, Department, UserDepartment, DepartmentTicket, File, Ticket, TicketChat, UserTicket, Board, Card, DepartmentBoard, List, UserBoard, Workflow, Step, WorkflowStep, WorkflowEdge, Job, JobStep, JobStepDepartment, JobStepUser, JobStepAction, WorkflowDepratment]
});

// connection.sync({ alter: true });  // Use cautiously

export default connection;