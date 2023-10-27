import { Model, Table, Column, DataType, ForeignKey, BelongsTo, AutoIncrement, PrimaryKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import List from './List';

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

    @ForeignKey(() => List)
    @Column({
        type: DataType.INTEGER
    })
    listId!: number;

    @BelongsTo(() => List)
    list!: List;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}