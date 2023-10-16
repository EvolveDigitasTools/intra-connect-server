import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, Default, HasMany, IsEmail, Model, PrimaryKey, Table, Unique, UpdatedAt } from "sequelize-typescript";
import UserDepartment from "./UserDepartment";

@Table({
    tableName: 'user',
    timestamps: false
})
export default class User extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @AllowNull(false)
    @IsEmail
    @Unique
    @Column({
        type: DataType.STRING
    })
    email!: string;

    @Column({
        type: DataType.STRING
    })
    name!: string;

    @HasMany(() => UserDepartment)
    departments!: UserDepartment[];

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}