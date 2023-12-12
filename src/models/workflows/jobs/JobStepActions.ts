import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import JobStep from "./JobStep";
import User from "../../auth/User";

@Table({
    tableName: 'job_step_actions',
    timestamps: true
})
export default class JobStepAction extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @ForeignKey(() => JobStep)
    @Column({
        type: DataType.INTEGER
    })
    jobStepId!: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    actionType!: 'done' | 'approved' | 'declined'

    @Column({
        type: DataType.STRING
    })
    actionMessage!: string

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    actionUserId!: number

    @CreatedAt
    actionTime!: Date
}