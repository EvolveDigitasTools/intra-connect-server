import { Table, Column, Model, ForeignKey, DataType, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import Department from '../auth/Department';
import Ticket from './Ticket';

@Table({
  tableName: 'department_tickets',
})
export default class DepartmentTicket extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER
  })
  departmentId!: number;

  @ForeignKey(() => Ticket)
  @Column({
    type: DataType.INTEGER
  })
  ticketId!: number;
}