import { Model, Table, Column, DataType, AutoIncrement, PrimaryKey, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Ticket from './Ticket';
import TicketChat from './TicketChat';

@Table({
  tableName: 'files',
})
export default class File extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER
  })
  id!: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  fileName!: string;

  @AllowNull(false)
  @Column({
    type: DataType.BLOB('medium')
  })
  fileContent!: Buffer;

  @Column({
    type: DataType.STRING
  })
  fileType!: string;

  @ForeignKey(() => Ticket)
  @Column({
    type: DataType.INTEGER
  })
  ticketId!: number;

  @ForeignKey(() => TicketChat)
  @Column({
    type: DataType.INTEGER
  })
  ticketChatId!: number;

  @BelongsTo(() => Ticket)
  ticket!: Ticket

  @BelongsTo(() => TicketChat)
  ticketChat!: TicketChat
}
