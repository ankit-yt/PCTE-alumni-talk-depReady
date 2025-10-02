import { NextFunction } from "express";
import { register } from "module";

export const adminRegister = async(req:Request , res:Response , next: NextFunction)=>{
    try{
        const data= req.body
    const user = await registerService(data)
    return res.status(200).json({status:"success", data:user})
    }catch(err:any){
        console.log("Error registering admin : ", err)
        next(err)
    }
}