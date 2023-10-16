import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import * as mysql from "mysql2";
import Department from "../models/Department";
import UserDepartment from "../models/UserDepartment";

const connection = new Sequelize({
  dialect: "mysql",
  dialectModule: mysql,
  host: '62.72.3.60',
  username: 'intra-admin',
  password: 'intra-pass',
  database: 'intra_connect',
  port: 3306,
  models: [User, Department, UserDepartment]
});

// connection.sync({ alter: true });  // Use cautiously

export default connection;