import jwt from "jsonwebtoken"
import { IUser } from "../types/user"
import { Request, Response } from "express"

export const sendToken=(user:IUser, res:Response,statusCode:number)=>{
    const payload = {id:user._id,email:user.email};
    const token = jwt.sign(payload,process.env.JWT_SECRET as string,{expiresIn:"7d"});
    
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


}