"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = void 0;
const isUser = (assignee) => {
    if (assignee.includes('@'))
        return true;
    return false;
};
exports.isUser = isUser;
