import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import * as mysql from "mysql2";
import Department from "../models/Department";
import UserDepartment from "../models/UserDepartment";
import DepartmentTicket from "../models/DepartmentTicket";
import File from "../models/File";
import Ticket from "../models/Ticket";
import TicketChat from "../models/TicketChat";
import UserTicket from "../models/UserTicket";
import Board from "../models/Board";
import Card from "../models/Card";
import DepartmentBoard from "../models/DepartmentBoard";
import List from "../models/List";
import UserBoard from "../models/UserBoard";
import Workflow from "../models/Workflow";
import Step from "../models/Step";
import WorkflowStep from "../models/WorkflowStep";
import WorkflowEdge from "../models/WorkflowEdge";
import Job from "../models/Job";
import JobStep from "../models/JobStep";
import JobStepDepartment from "../models/JobStepDepartment";
import JobStepUser from "../models/JobStepUser";

const connection = new Sequelize({
  dialect: "mysql",
  dialectModule: mysql,
  host: '62.72.3.60',
  username: 'intra-admin',
  password: 'intra-pass',
  database: 'intra_connect',
  port: 3306,
  models: [User, Department, UserDepartment, DepartmentTicket, File, Ticket, TicketChat, UserTicket, Board, Card, DepartmentBoard, List, UserBoard, Workflow, Step, WorkflowStep, WorkflowEdge, Job, JobStep, JobStepDepartment, JobStepUser]
});

// connection.sync({ alter: true });  // Use cautiously

export default connection;