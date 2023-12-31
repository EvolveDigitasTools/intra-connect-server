import { Table, Column, Model, ForeignKey, DataType, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import Department from '../auth/Department';
import Board from './Board';

@Table({
  tableName: 'department_boards',
})
export default class DepartmentBoard extends Model {
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

  @ForeignKey(() => Board)
  @Column({
    type: DataType.INTEGER
  })
  boardId!: number;
}