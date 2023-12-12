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
const List_1 = __importDefault(require("./List"));
const User_1 = __importDefault(require("../auth/User"));
const UserBoard_1 = __importDefault(require("./UserBoard"));
const Department_1 = __importDefault(require("../auth/Department"));
const DepartmentBoard_1 = __importDefault(require("./DepartmentBoard"));
const Card_1 = __importDefault(require("./Card"));
let Board = class Board extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    })
], Board.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], Board.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)('[]'),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], Board.prototype, "listOrder", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => User_1.default, () => UserBoard_1.default)
], Board.prototype, "members", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Department_1.default, () => DepartmentBoard_1.default)
], Board.prototype, "departments", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], Board.prototype, "createdBy", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.default, 'createdBy')
], Board.prototype, "creator", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => List_1.default)
], Board.prototype, "lists", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Card_1.default)
], Board.prototype, "cards", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], Board.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], Board.prototype, "updatedAt", void 0);
Board = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'boards',
        timestamps: true
    })
], Board);
exports.default = Board;
