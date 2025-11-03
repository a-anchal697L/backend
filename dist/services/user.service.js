"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_1 = require("../models/user");
const error_1 = require("../utils/error");
class UserService {
    // Create new user
    async createUser(userData) {
        const { name, email, password } = userData;
        if (!name || name.trim() === "") {
            throw new error_1.ErrorHandler("Name is required", 400);
        }
        if (!email || email.trim() === "") {
            throw new error_1.ErrorHandler("Email is required", 400);
        }
        if (!password || password.trim() === "") {
            throw new error_1.ErrorHandler("Password is required", 400);
        }
        const existingUser = await user_1.UserModel.findOne({ email });
        if (existingUser) {
            throw new error_1.ErrorHandler("User already exists. Please log in instead.", 400);
        }
        const newUser = await user_1.UserModel.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: password.trim(),
        });
        return newUser;
    }
    // login 
    async login(userData) {
        const { email, password } = userData;
        if (!email || email.trim() === "") {
            throw new error_1.ErrorHandler("Email is required", 400);
        }
        if (!password || password.trim() === "") {
            throw new error_1.ErrorHandler("Password is required", 400);
        }
        // Find user
        const user = await user_1.UserModel.findOne({ email: email.toLowerCase().trim() }).select("+password");
        // select("+password") if password field is set to select:false in schema
        if (!user) {
            throw new error_1.ErrorHandler("Invalid email or password", 401);
        }
        const isMatch = await user.comparePassword(password.trim());
        if (!isMatch) {
            throw new error_1.ErrorHandler("Invalid email or password", 401);
        }
        return user;
    }
}
exports.UserService = UserService;
