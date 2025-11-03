"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendToken = (user, res, statusCode) => {
    const payload = { id: user._id, email: user.email };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(statusCode).json({
        success: true,
        message: "Login successful",
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
    });
};
exports.sendToken = sendToken;
