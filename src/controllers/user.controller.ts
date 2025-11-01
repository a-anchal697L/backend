import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { sendToken } from "../utils/sendToken";


const userService = new UserService();
export class UserController {

  //signup
  async createUser(req: Request, res: Response): Promise<void> {
      const newUser = await userService.createUser(req.body);
      res.status(201).json({ message: "Sign up successfully", user: newUser });  
  }

   // login
  async loginUser(req: Request, res: Response): Promise<void> {
      const { email, password } = req.body;
      const user = await userService.login({ email, password });
      sendToken(user, res, 200);
  }

}
