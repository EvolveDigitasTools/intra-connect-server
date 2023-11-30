"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = __importDefault(require("./User"));
const Department_1 = __importDefault(require("./Department"));
const UserTicket_1 = __importDefault(require("./UserTicket"));
const DepartmentTicket_1 = require("./DepartmentTicket");
const TicketChat_1 = __importDefault(require("./TicketChat"));
const File_1 = __importDefault(require("./File"));
let Ticket = class Ticket extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], Ticket.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], Ticket.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], Ticket.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)('open'),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], Ticket.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], Ticket.prototype, "createdBy", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.default, 'createdBy')
], Ticket.prototype, "creator", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => User_1.default, () => UserTicket_1.default)
], Ticket.prototype, "assignees", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Department_1.default, () => DepartmentTicket_1.DepartmentTicket)
], Ticket.prototype, "assignedDepartments", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => TicketChat_1.default)
], Ticket.prototype, "chat", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => File_1.default)
], Ticket.prototype, "files", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], Ticket.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], Ticket.prototype, "updatedAt", void 0);
Ticket = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'ticket',
        timestamps: false
    })
], Ticket);
exports.default = Ticket;
