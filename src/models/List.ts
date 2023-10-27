import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany, AutoIncrement, PrimaryKey, AllowNull, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import Board from './Board';
import Card from './Card';

@Table({
    tableName: 'lists',
    timestamps: true
})
export default class List extends Model {
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

    @ForeignKey(() => Board)
    @Column({
        type: DataType.INTEGER
    })
    boardId!: number;

    @BelongsTo(() => Board)
    board!: Board;

    @HasMany(() => Card)
    cards!: Card[];

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}