"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regex = void 0;
exports.regex = {
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
};
