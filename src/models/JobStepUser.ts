import { Table, Column, Model, ForeignKey, DataType, AllowNull, AutoIncrement, PrimaryKey, BelongsTo } from 'sequelize-typescript';
import User from './User';
import JobStep from './JobStep';

@Table({
  tableName: 'job_step_user',
})
export default class JobStepUser extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  userId!: number;

  @ForeignKey(() => JobStep)
  @Column({
    type: DataType.INTEGER
  })
  jobStepId!: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  role!: 'assignee' | 'approver';

  @BelongsTo(() => User)
  user!: User
}
