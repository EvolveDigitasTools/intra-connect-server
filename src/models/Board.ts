import { Model, Table, Column, DataType, HasMany, AutoIncrement, PrimaryKey, AllowNull, BelongsToMany, CreatedAt, ForeignKey, BelongsTo, UpdatedAt, Default } from 'sequelize-typescript';
import List from './List';
import User from './User';
import { UserBoard } from './UserBoard';
import Department from './Department';
import { DepartmentBoard } from './DepartmentBoard';
import Card from './Card';

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

    @Default('[]')
    @Column({
        type: DataType.STRING
    })
    listOrder!: string

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

    @HasMany(() => Card)
    cards!: Card[];

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}