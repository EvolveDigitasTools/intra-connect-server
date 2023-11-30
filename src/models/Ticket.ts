import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, CreatedAt, DataType, Default, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import User from "./User";
import Department from "./Department";
import UserTicket from "./UserTicket";
import { DepartmentTicket } from "./DepartmentTicket";
import TicketChat from "./TicketChat";
import File from "./File";

@Table({
    tableName: 'ticket',
    timestamps: false
})
export default class Ticket extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    title!: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    description!: string;

    @Default('open')
    @Column({
        type: DataType.STRING
    })
    status!: 'open' | 'closed'

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    createdBy!: number;

    @BelongsTo(() => User, 'createdBy')
    creator!: User;

    @BelongsToMany(() => User, () => UserTicket)
    assignees!: User[];

    @BelongsToMany(() => Department, () => DepartmentTicket)
    assignedDepartments!: Department[];

    @HasOne(() => TicketChat)
    chat!: TicketChat;

    @HasMany(() => File)
    files!: File[]

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}