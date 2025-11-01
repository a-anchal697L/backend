import { UserModel } from "../models/user";
import { IUser } from "../types/user";
import { ErrorHandler } from "../utils/error";


export class UserService {

  // Create new user
  async createUser(userData: IUser) {
    const { name, email, password } = userData;
    if (!name || name.trim() === "") {
      throw new ErrorHandler("Name is required", 400);
    }

    if (!email || email.trim() === "") {
      throw new ErrorHandler("Email is required", 400);
    }

    if (!password || password.trim() === "") {
      throw new ErrorHandler("Password is required", 400);
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new ErrorHandler("User already exists. Please log in instead.", 400);
    }

    const newUser = await UserModel.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password.trim(),
    });

    return newUser;
  
  }

    // login 
   async login(userData: any) {
    const { email, password } = userData;

    if (!email || email.trim() === "") {
      throw new ErrorHandler("Email is required", 400);
    }

    if (!password || password.trim() === "") {
      throw new ErrorHandler("Password is required", 400);
    }

    // Find user
    const user = await UserModel.findOne({ email: email.toLowerCase().trim() }).select("+password"); 
    // select("+password") if password field is set to select:false in schema

    if (!user) {
      throw new ErrorHandler("Invalid email or password", 401);
    }

    const isMatch = await user.comparePassword(password.trim());
    if (!isMatch) {
      throw new ErrorHandler("Invalid email or password", 401);
    }
    return user;
  }
}
