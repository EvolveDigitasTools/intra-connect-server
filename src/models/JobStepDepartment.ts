import { Table, Column, Model, ForeignKey, DataType, AutoIncrement, PrimaryKey, AllowNull, BelongsTo } from 'sequelize-typescript';
import Department from './Department';
import JobStep from './JobStep';

@Table({
  tableName: 'job_step_department',
})
export default class JobStepDepartment extends Model {
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

  @BelongsTo(() => Department)
  department!: Department
}
