import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import Step from "./Step";
import Department from "./Department";

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

    @ForeignKey(() => Department)
    @Column({
        type: DataType.INTEGER,
    })
    departmentId!: number;

    @HasMany(() => Step)
    steps!: Step[];

    @BelongsTo(() => Department)
    department?: Department;

    @HasOne(() => Step)
    startStep!: Step
}