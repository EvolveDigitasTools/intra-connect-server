import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import User from '../auth/User';
import Ticket from './Ticket';

@Table({
  tableName: 'user_tickets',
})
export default class UserTicket extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  userId!: number;

  @ForeignKey(() => Ticket)
  @Column({
    type: DataType.INTEGER
  })
  ticketId!: number;
}
