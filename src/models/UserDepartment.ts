import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasOne, AutoIncrement, PrimaryKey, AllowNull, Default } from 'sequelize-typescript';
import User from './User';
import Department from './Department';

@Table({
  tableName: 'user-department',
  timestamps: false
})
export default class UserDepartment extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId!: number;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
  })
  departmentId!: number;
  
  @Default(false)
  @AllowNull(false)
  @Column({
      type: DataType.BOOLEAN
  })
  isAdmin!: boolean
  
  @BelongsTo(() => User)
  user?: User;
  
  @BelongsTo(() => Department)
  department?: Department;
}
