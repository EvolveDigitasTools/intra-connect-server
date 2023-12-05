import { AutoIncrement, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Job from "./Job";
import WorkflowStep from "./WorkflowStep";
import JobStepUser from "./JobStepUser";
import JobStepDepartment from "./JobStepDepartment";

@Table({
    tableName: 'job_step',
    timestamps: false
})
export default class JobStep extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @ForeignKey(() => Job)
    @Column({
        type: DataType.INTEGER
    })
    jobId!: number;

    @ForeignKey(() => WorkflowStep)
    @Column({
        type: DataType.INTEGER
    })
    workflowStepId!: number;

    @HasMany(() => JobStepUser)
    users!: JobStepUser[];

    @HasMany(() => JobStepDepartment)
    departments!: JobStepDepartment[];

    @Column({
        type: DataType.INTEGER
    })
    timeNeeded!: number

    @Column({
        type: DataType.STRING
    })
    timeUnit!: 'minutes' | 'hours' | 'days' | 'weeks'
}