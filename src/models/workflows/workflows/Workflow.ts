import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import WorkflowStep from "./WorkflowStep";
import WorkflowEdge from "./WorkflowEdge";
import WorkflowDepratment from "./WorkflowDepartment";
import Department from "../../auth/Department";

@Table({
    tableName: 'workflow',
    timestamps: true
})
export default class Workflow extends Model {
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

    @Column({
        type: DataType.STRING
    })
    description!: string;

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    published!: boolean

    @BelongsToMany(() => Department, () => WorkflowDepratment)
    departments!: Department[];

    @HasMany(() => WorkflowStep)
    steps!: WorkflowStep[];

    @HasMany(() => WorkflowEdge)
    edges!: WorkflowEdge[];
}