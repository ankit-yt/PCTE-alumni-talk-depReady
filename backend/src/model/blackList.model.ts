import mongoose from 'mongoose'
import { blacklistInterface } from '../types/model.interface'

const blackListSchema = new mongoose.Schema<blacklistInterface>({
    token:{type:String , required:true , unique:true},
    expiresAt:{type:Date , required:true}
})

blackListSchema.index({expiresAt:1},{expireAfterSeconds:0})

export const blacklistModel = mongoose.model<blacklistInterface>('blacklist' , blackListSchema)
