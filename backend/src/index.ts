import dotenv from "dotenv";
dotenv.config();

import express ,{ Application , Request , Response } from "express";

import path from "path";
import {connectDB} from './config/mongodb.config'
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app:Application = express();

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/public", express.static(path.join(__dirname,"../public")))
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pcte-alumni-talk-dep-ready.vercel.app/",
      "http://192.168.29.104:5173"
    ],
    credentials: true
  })
);



import globalErrorHandler from "./utility/globalError";
import alumniMeetRoute from './routes/alumniMeet.route'
import adminAuthRoute from './routes/auth.route'
import { fileURLToPath } from "url";
import reportRoute from './routes/report.route'


app.use("/",alumniMeetRoute) 
app.use("/admin", adminAuthRoute)
app.use("/report", reportRoute)
 

app.use(globalErrorHandler)
app.listen(3000,()=>{
    console.log("listening on port 3000");
})