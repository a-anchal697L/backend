"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../utils/error");
const user_1 = require("../models/user");
const isAuthenticated = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await user_1.UserModel.findById(decoded.id).select("-password");
        if (!user) {
            throw new error_1.ErrorHandler("User not found", 404);
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error.name === "JsonWebTokenError") {
            next(new error_1.ErrorHandler("Invalid token", 401));
        }
        else if (error.name === "TokenExpiredError") {
            next(new error_1.ErrorHandler("Token expired, please login again", 401));
        }
        else {
            next(error);
        }
    }
};
exports.isAuthenticated = isAuthenticated;
