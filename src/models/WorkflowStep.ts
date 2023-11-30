import { AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Workflow from "./Workflow";
import Step from "./Step";

@Table({
    tableName: 'workflow_step',
})
export class WorkflowStep extends Model {
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

    @ForeignKey(() => Step)
    @Column({
        type: DataType.INTEGER
    })
    stepId!: number;

    @Column({
        type: DataType.STRING
    })
    description!: string

    @Column({
        type: DataType.STRING
    })
    assigneesDesignation!: string

    @Column({
        type: DataType.STRING
    })
    name!: string;

    @Default(0)
    @Column({
        type: DataType.INTEGER
    })
    position_x!: number

    @Default(0)
    @Column({
        type: DataType.INTEGER
    })
    position_y!: number

    @BelongsTo(() => Step)
    step!: Step
}