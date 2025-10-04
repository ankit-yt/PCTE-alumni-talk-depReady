import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utility/jwt";
import { UnauthorizedError } from "../utility/customErrors";
import { JwtPayload } from "../types/interface";

export const authMiddleware = async(req:Request , res:Response , next:NextFunction)=>{
    try{
        console.log(req.cookies)
        const token = req.cookies.authToken
        console.log(token)
    if(!token){
        throw new UnauthorizedError("Unauthorized access")
    }
    const decode = await verifyToken(token)
    if(!decode){
        throw new UnauthorizedError("Unauthorized access")
    }
    req.user = decode as JwtPayload
    next()
    }catch(err:any){
        console.log(err.message)
        next(err)
    }
}