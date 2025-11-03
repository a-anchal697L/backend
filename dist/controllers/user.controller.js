"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const sendToken_1 = require("../utils/sendToken");
const userService = new user_service_1.UserService();
class UserController {
    //signup
    async createUser(req, res) {
        const newUser = await userService.createUser(req.body);
        res.status(201).json({ message: "Sign up successfully", user: newUser });
    }
    // login
    async loginUser(req, res) {
        const { email, password } = req.body;
        const user = await userService.login({ email, password });
        (0, sendToken_1.sendToken)(user, res, 200);
    }
}
exports.UserController = UserController;
