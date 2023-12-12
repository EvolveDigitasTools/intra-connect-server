import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Department from '../../auth/Department';
import Workflow from './Workflow';

@Table({
  tableName: 'workflow_department',
  timestamps: false
})
export default class WorkflowDepratment extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER
  })
  id!: number;

  @ForeignKey(() => Workflow)
  @Column({
    type: DataType.INTEGER,
  })
  workflowId!: number;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
  })
  departmentId!: number;
}
