import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany, AutoIncrement, PrimaryKey, AllowNull, CreatedAt, UpdatedAt, Default } from 'sequelize-typescript';
import Board from './Board';

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

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    boardListId!: number

    @Default('[]')
    @Column({
        type: DataType.STRING
    })
    cardOrder!: string

    @ForeignKey(() => Board)
    @Column({
        type: DataType.INTEGER
    })
    boardId!: number;

    @BelongsTo(() => Board)
    board!: Board;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}