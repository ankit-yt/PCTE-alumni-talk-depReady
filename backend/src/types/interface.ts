import { careerStep } from "./model.interface"
import { Request } from "express";
import {JwtPayload} from 'jsonwebtoken'

export interface customRequest extends Request{
  fileName? : string;
}

export interface AlumniMeetInput {
  title: string;
  time: Date;
  classJoined: any;
  organizedBy: string;
  location:string;
  alumni: any;
  media:meetMedia;
  description: string;
  deleteImageUrls?:string[];
  deleteImagesIds?:string[];
}

export interface AlumniInput{
    name: string;
    profilePic: String;
    fileName:String;
    batch: string;
    linkedIn: string;
    email: string;
    currentCompany: string;
    currentRole: string;
    startingCompany: string;
    startingPackage: string;
    careerTimeline: careerStep[];
    achievements: string[];
    quote?: string;
}

export interface meetMedia{
  images:{image:string , imageId:string}[],
  videoLink?:string,
  videoId?:string
}

export  interface customPayload extends JwtPayload{
  id:string,
  email:string
}
