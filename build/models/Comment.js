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
const BuyingOrder_1 = __importDefault(require("./BuyingOrder"));
const SKU_1 = __importDefault(require("./SKU"));
const User_1 = __importDefault(require("./User"));
let Comment = class Comment extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    })
], Comment.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    })
], Comment.prototype, "comment", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Comment),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], Comment.prototype, "commentId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => BuyingOrder_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], Comment.prototype, "buyingOrderId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => SKU_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], Comment.prototype, "skuId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], Comment.prototype, "vendorId", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Comment)
], Comment.prototype, "comments", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Comment)
], Comment.prototype, "parentComment", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => BuyingOrder_1.default)
], Comment.prototype, "buyingOrder", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => SKU_1.default)
], Comment.prototype, "sku", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.default)
], Comment.prototype, "vendor", void 0);
Comment = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'comments',
    })
], Comment);
exports.default = Comment;
