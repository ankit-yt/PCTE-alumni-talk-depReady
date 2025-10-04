
import jwt from 'jsonwebtoken'
import { customPayload } from '../types/interface'

export const generateToken = async (payload:customPayload):Promise<string>=>{

    if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables!");
}

    return jwt.sign(payload , process.env.JWT_SECRET as string , {expiresIn:"1d"})
}

export const verifyToken = async(token:string)=>{
    if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables!");
}

    return jwt.verify(token, process.env.JWT_SECRET as string)
}