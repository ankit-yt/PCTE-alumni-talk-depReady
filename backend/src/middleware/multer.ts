  import multer , {StorageEngine} from 'multer';
  import path from 'path';
  import {CloudinaryStorage} from 'multer-storage-cloudinary';
  import cloudinary from '../config/cloudnary';
  import fs from 'fs'
import { customRequest } from '../types/interface';


const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const isVideo = file.mimetype.startsWith("video");
    return {
      folder: isVideo ? "alumniMeet/videos" : "alumniMeet/images",
      resource_type: isVideo ? "video" : "image",
      allowed_formats: isVideo ? ["mp4"] : ["jpg", "png", "jpeg", "webp"],
    };
  },
});

const profilePicWithBgStorage : StorageEngine = new CloudinaryStorage({
  cloudinary,
  params:(req , file)=>{
    return {
      folder: "alumniMeet/profilePic",
      resource_type: "image",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    };
  }
})

const adminPicStorafe : StorageEngine = new CloudinaryStorage({
  cloudinary,
  params:(req, file)=>{
    return {
      folder: "alumniMeet/admin",
      resource_type: "image",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    };
  }
})

const profilePicStorage: StorageEngine = multer.diskStorage({
 
  destination: (req , file, cb) => {
    const uploadPath = path.join("public", "uploads", "profilePic");

    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req : customRequest, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname);
    const name = `${uniqueName}${extension}`;
    req.fileName = name;
    cb(null, name );
  },
});


  // export const profilePicUpload = multer({ storage: profilePicStorage})
  export const profilePicWithBgUpload = multer({storage:profilePicWithBgStorage})
  export const adminPicUpload = multer({storage:adminPicStorafe})
  export const alumniMeetUpload = multer({ storage }).fields([
  { name: "images", maxCount: 50 },
  { name: "video", maxCount: 1 },
]);
