"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createDate_1 = __importDefault(require("./createDate"));
test('creates a date without time', () => {
    const date = (0, createDate_1.default)(2018, 11, 32);
    expect(date instanceof Date).toBe(true);
    expect(date.getFullYear()).toBe(2019);
    expect(date.getMonth()).toBe(0);
    expect(date.getDate()).toBe(1);
    expect(date.getMinutes()).toBe(0);
    expect(date.getHours()).toBe(0);
});
