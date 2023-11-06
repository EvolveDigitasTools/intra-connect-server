import { Model, Table, Column, DataType, ForeignKey, BelongsTo, AutoIncrement, PrimaryKey, CreatedAt, UpdatedAt, AllowNull } from 'sequelize-typescript';
import List from './List';
import Board from './Board';

@Table({
    tableName: 'cards',
    timestamps: true
})
export default class Card extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title!: string;

    @Column({
        type: DataType.STRING,
    })
    description!: string;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    boardCardId!: number

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