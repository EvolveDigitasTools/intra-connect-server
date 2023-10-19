import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
} from 'sequelize-typescript';
import Ticket from './Ticket';
import User from './User';

@Table({
  tableName: 'ticket_chats',
})
export class TicketChat extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER
  })
  id!: number;

  @ForeignKey(() => Ticket)
  @Column({
    type: DataType.INTEGER
  })
  ticketId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  userId!: number;


  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  message!: string;

  @CreatedAt
  createdAt?: Date;

  @BelongsTo(() => Ticket)
  ticket!: Ticket;

  @BelongsTo(() => User)
  user!: User;
}
