import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import JobStep from "./JobStep";
import Workflow from "./Workflow";

@Table({
    tableName: 'job',
    timestamps: true
})
export default class Job extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    name!: string;

    @ForeignKey(() => Workflow)
    @Column({
        type: DataType.INTEGER,
    })
    workflowId!: number;

    @HasMany(() => JobStep)
    steps!: JobStep[];

    @BelongsTo(() => Workflow)
    workflow?: Workflow;
}