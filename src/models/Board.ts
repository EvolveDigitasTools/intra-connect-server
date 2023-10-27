import { Model, Table, Column, DataType, HasMany, AutoIncrement, PrimaryKey, AllowNull, BelongsToMany, CreatedAt, ForeignKey, BelongsTo, UpdatedAt } from 'sequelize-typescript';
import List from './List';
import User from './User';
import { UserBoard } from './UserBoard';
import Department from './Department';
import { DepartmentBoard } from './DepartmentBoard';

@Table({
    tableName: 'boards',
    timestamps: true
})
export default class Board extends Model {
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
    title!: string;

    @BelongsToMany(() => User, () => UserBoard)
    members!: User[];

    @BelongsToMany(() => Department, () => DepartmentBoard)
    departments!: Department[];

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    createdBy!: number;

    @BelongsTo(() => User, 'createdBy')
    creator!: User;

    @HasMany(() => List)
    lists!: List[];

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}