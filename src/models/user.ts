import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user";
import { regex } from "../utils/regex";
import bcrypt from "bcryptjs";

const userSchema: Schema<IUser> = new Schema(
    {
     name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: (v: string) => regex.email.test(v),
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      validate: {
        validator: (v: string) => regex.password.test(v),
        message:
          "Password must have at least 8 characters, including uppercase, lowercase, number, and special character.",
      },
      select: false, 
    },
  },
  { timestamps: true }
    
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};


export const UserModel = mongoose.model<IUser>("User", userSchema);