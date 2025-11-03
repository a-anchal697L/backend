"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const asyncHandler_1 = require("../middleware/asyncHandler");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
// Create user (Sign up)
router.post("/signup", (0, asyncHandler_1.asyncHandler)(async (req, res) => userController.createUser(req, res)));
// Login
router.post("/login", (0, asyncHandler_1.asyncHandler)((req, res) => userController.loginUser(req, res)));
exports.default = router;
