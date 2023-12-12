import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import User from '../auth/User';
import Board from './Board';

@Table({
  tableName: 'user_boards',
})
export default class UserBoard extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  userId!: number;

  @ForeignKey(() => Board)
  @Column({
    type: DataType.INTEGER
  })
  boardId!: number;
}
