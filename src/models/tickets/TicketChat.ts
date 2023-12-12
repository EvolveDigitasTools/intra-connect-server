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
  HasMany,
} from 'sequelize-typescript';
import Ticket from './Ticket';
import User from '../auth/User';
import File from '../utils/File';

@Table({
  tableName: 'ticket_chats',
  timestamps: true
})
export default class TicketChat extends Model {
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

  @HasMany(() => File)
  files!: File[]

  @CreatedAt
  createdAt?: Date;

  @BelongsTo(() => Ticket)
  ticket!: Ticket;

  @BelongsTo(() => User)
  user!: User;
}
