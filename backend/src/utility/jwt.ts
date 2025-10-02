import jwt from 'jsonwebtoken'
import { customPayload } from '../types/interface'
import dotenv from 'dotenv'
dotenv.config()

export const generateToken = async (payload:customPayload):Promise<string>=>{
    return jwt.sign(payload , process.env.JWT_SECRET as string , {expiresIn:"1d"})
}

export const verifyToken = async(token:string)=>{
    return jwt.verify(token, process.env.JWT_SECRET as string)
}