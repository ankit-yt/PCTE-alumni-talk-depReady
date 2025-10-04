import { NextFunction, Request, Response } from "express";
import { register } from "module";
import { getFullUserService, loginService, logoutService, registerService } from "../services/auth.service";
import { loginData, RegisterData } from "../types/interface";
import { cookieOptions } from "../config/cookie.config";
import { Multer } from "multer";
import { deleteFromCloudinary } from "../utility/cloudnaryDeletion";
import { JwtPayload } from "jsonwebtoken";
import apiError from "../utility/error";
import { UnauthorizedError } from "../utility/customErrors";

export const adminRegister = async (
  req: Request<{}, {}, RegisterData>,
  res: Response,
  next: NextFunction
) => {
  let file;
  try {
    file = req.file as Express.Multer.File & {
      path: string;
      filename: string;
    };
    const data: RegisterData = req.body;

    const { user, token } = await registerService({
      ...data,
      avatar: { url: file?.path, public_id: file?.filename },
    });

    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
    };

    res.cookie("authToken", token, cookieOptions);

    return res.status(201).json({
      status: "success",
      message: "Admin registered successfully",
      user: safeUser,
    });
  } catch (err) {
    if (file) {
      await deleteFromCloudinary(file.filename);
    }
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: loginData = req.body;
    const { user, token } = await loginService(data);
    res.cookie("authToken", token, cookieOptions);
    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      user: user,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async(req:Request , res:Response , next:NextFunction)=>{
    try{
            const token = req.cookies.authToken
    const {message} = await logoutService(token)
    res.clearCookie("authToken")
    return res.status(200).json({message})
    }catch(err:any){
        next(err)
    }

}

export const getMe = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const user = req.user as JwtPayload
        if(!user){
            throw new UnauthorizedError("Unauthorized access")
        }
        const fullUser = await getFullUserService(user.id)
    
        return res.status(200).json({status:"success",data: fullUser , message:"user fetched successfully"})
    }catch(err:any){
        next(err)
    }
}