import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'step',
    timestamps: false
})
export default class Step extends Model {
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
    type!: string
}