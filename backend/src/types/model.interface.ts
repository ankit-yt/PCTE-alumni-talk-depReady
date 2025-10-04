import { Document } from "mongoose";
import { meetMedia, user } from "./interface";
export interface careerStep{
    year:string;
    role:string;
    company:string;
    location:string;
}

export interface Alumni extends Document {
  name: string;
  profilePic: String;
  fileName:String;
  batch: string;
  linkedIn: string;
  email?: string;
  currentCompany: string;
  currentRole: string;
  startingCompany: string;
  startingPackage: string;
  careerTimeline: careerStep[];
  achievements: string[];
  quote?: string;
}


export interface alumniMeetDocument extends Document {
    title:string;
    time:Date;
    classJoined:string[];
    status:String,
    organizedBy:string;
    location:string;
    alumni:Alumni;
    media:meetMedia;
    description:string;
    createdAt:Date;

}


export interface feedback extends Document{
  avatar:string
  name:string,
  comment:string,
  company:string,
  createdAt:Date
}

export interface userDocument extends Document{
    name:string,
    email:string,
    password:string,
    phone?:string,
    avatar?:{
      url:string,
      public_id:string
    }

    createdAt:Date,
    updatedAt:Date,
    comparePassword(password:string):Promise<boolean>
}

export interface blacklistInterface extends Document{
  token:string,
  expiresAt:Date
}