import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Workflow from "./Workflow";

@Table({
    tableName: 'step',
    timestamps: true
})
export default class Step extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @Column({
        type: DataType.STRING
    })
    name!: string;

    @Default('task')
    @Column({
        type: DataType.STRING
    })
    type!: string

    @Column({
        type: DataType.STRING
    })
    description!: string

    @Column({
        type: DataType.STRING
    })
    assigneesDesignation!: string

    @ForeignKey(() => Workflow)
    @Column({
        type: DataType.INTEGER
    })
    workflowId!: number

    @BelongsTo(() => Workflow)
    workflow!: Workflow
}