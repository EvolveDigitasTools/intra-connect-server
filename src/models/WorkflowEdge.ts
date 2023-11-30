import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Workflow from "./Workflow";
import WorkflowStep from "./WorkflowStep";

@Table({
    tableName: 'workflow_edge',
})
export default class WorkflowEdge extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @ForeignKey(() => Workflow)
    @Column({
        type: DataType.INTEGER
    })
    workflowId!: number;

    @ForeignKey(() => WorkflowStep)
    @Column({
        type: DataType.INTEGER
    })
    workflowSourceStepId!: number;

    @ForeignKey(() => WorkflowStep)
    @Column({
        type: DataType.INTEGER
    })
    workflowTargetStepId!: number;
}