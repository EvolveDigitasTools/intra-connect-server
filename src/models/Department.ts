import { Model, Table, Column, DataType, AutoIncrement, PrimaryKey, AllowNull, HasMany } from 'sequelize-typescript';
import UserDepartment from './UserDepartment';
import Workflow from './Workflow';

@Table({
  tableName: 'department',
  timestamps: false
})
export default class Department extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
  })
  description!: string;

  @HasMany(() => Workflow)
  workflows!: Workflow[]

  @HasMany(() => UserDepartment)
  users!: UserDepartment[];
}
