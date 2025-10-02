import { Request, Response, NextFunction } from "express";
import {
  addNewAlumniService,
  addNewFeedbackService,
  createNewAlumniMeetService,
  deleteAlumniMeetService,
  deleteAlumniService,
  deleteMeetMediaService,
  feedbackPaginationService,
  getAllAlumniListService,
  getAllAlumniMeetsService,
  getTalksPaginationService,
  updateAlumniMeetService,
  updateAlumniService,
  updateMeetMediaService,
} from "../services/alumniMeet.service";
import { alumniMeetDocument } from "../types/model.interface";
import {
  AlumniInput,
  AlumniMeetInput,
  customRequest,
} from "../types/interface";
import { removeBackground } from "../utility/aiBgRemover";
import { deleteFromCloudinary } from "../utility/cloudnaryDeletion";
import { getAlumniById } from "../dao/alumniMeet.dao";
import alumniMeetModel from "../model/alumniMeet.model";
import alumniModel from "../model/alumni.model";
import feebackModel from "../model/feedback.model";

export const getAllAlumni = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const alumniList = await getAllAlumniListService();
    res.status(200).json(alumniList);
  } catch (err) {
    next(err);
  }
};

export const addNewAlumni = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const file = req.file as Express.Multer.File & {
      path: string;
      filename: string;
    };

    const parsedCareerTimeline = JSON.parse(data.careerTimeline);
    const parsedAchievements = JSON.parse(data.achievement);

    let profilePicUrl: string | undefined;
    let fileName: string | undefined;

    if (file) {
      // // ✅ remove bg and upload to cloudinary
      // profilePicUrl = await removeBackground(file.filename);
      profilePicUrl = file.path;
      fileName = file.filename;
    }

    const alumniInput: AlumniInput = {
      ...data,
      careerTimeline: parsedCareerTimeline,
      achievements: parsedAchievements,
      ...(profilePicUrl && {
        profilePic: profilePicUrl,
        fileName,
      }),
    };

    const newAlumni = await addNewAlumniService(alumniInput);

    return res.status(200).json({
      success: true,
      message: "Alumni added successfully",
      data: newAlumni,
    });
  } catch (err) {
    next(err);
  }
};


export const updateAlumni = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const imageFile = req.file as Express.Multer.File & {
      path: string;
      filename: string;
    };

    let profilePicUrl: string | undefined;
    let fileName: string | undefined;

    if (imageFile) {
      // ✅ remove bg and upload to cloudinary
      // profilePicUrl = await removeBackground(imageFile.filename);
       profilePicUrl = imageFile.path;
      fileName = imageFile.filename;
    }

    const data: AlumniInput = {
      ...req.body,
      achievements: req.body.achievement,
      ...(profilePicUrl && {
        profilePic: profilePicUrl,
        fileName,
      }),
    };

    const updatedAlumni = await updateAlumniService(id, data);
    res.status(200).json(updatedAlumni);
  } catch (error) {
    next(error);
  }
};


export const deleteAlumni = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const deletedAlumni = await deleteAlumniService(id);
    const fileName = deletedAlumni.fileName;
    await deleteFromCloudinary(fileName as string);

    res.status(200).json({
      success: true,
      message: "Alumni deleted successfully.",
      data: deletedAlumni,
    });
  } catch (err:any) {
    console.log(err.message)
    next(err);
  }
};

export const addNewAlumniMeet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const parsedClassJoined = JSON.parse(data.classJoined);
    console.log(parsedClassJoined);
    const parsedTime = new Date(data.date);

    const Files = req.files as {
      images?: (Express.Multer.File & { path: string; filename: string })[];
      video?: (Express.Multer.File & { path: string; filename: string })[];
    };
    // const images: string[] = Files?.images?.map((file) => file.path) || [];
    // const imagesIds: string[] = Files?.images?.map((file) => file.filename) || [];

    const images =
      Files?.images?.map((file) => ({
        image: file.path,
        imageId: file.filename,
      })) || [];

    const video: string = Files?.video?.[0]?.path || "";
    const videoId: string = Files?.video?.[0]?.filename || "";

    const newData: AlumniMeetInput = {
      ...data,
      classJoined: parsedClassJoined,
      time: parsedTime,
      media: {
        images,
        videoLink: video,
        videoId: videoId,
      },
    };
    console.log(newData);

    const newAlumniMeet = await createNewAlumniMeetService(newData);

    res.status(200).json({
      success: true,
      message: "Alumni Meet added successfully",
      data: newAlumniMeet,
    });
  } catch (err: any) {
    console.error(err.message);
    next(err);
  }
};

export const getAllAlumniMeets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const alumniMeets: alumniMeetDocument[] = await getAllAlumniMeetsService();

    res
      .status(200)
      .json({ success: true, message: "All Alumni Meets", data: alumniMeets });
  } catch (err) {
    next(err);
  }
};

export const updateAlumniMeet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    console.log(data.images);
    const parsedClassJoined = JSON.parse(data.classJoined);
    console.log("printing data");
    console.dir(data);
    const id = req.params.id;
    const Files = req.files as {
      images?: (Express.Multer.File & { path: string; filename: string })[];
      video?: (Express.Multer.File & { path: string; filename: string })[];
    };
    const images =
      Files?.images?.map((file) => ({
        image: file.path,
        imageId: file.filename,
      })) || [];

    console.log(images);

    const video: string = Files?.video?.[0]?.path || "";
    const videoId: string = Files?.video?.[0]?.filename || "";

    const newData: AlumniMeetInput = {
      ...data,
      classJoined: parsedClassJoined,
    };
    const talkVideo = video && {videoLink:video, videoId}
    console.log('videos : ' , talkVideo)
    const talkImages = images.length > 0 && images
    console.log('images : ' ,talkImages)

    console.dir(data);

    const deleteImagesUrls: string[] = req.body.deleteImages || [];
    const deleteImagesIds: string[] = req.body.deleteImagesIds || [];
    if (deleteImagesIds.length > 0) {
      await deleteFromCloudinary(deleteImagesIds as string[]);
    }
    const updatedAlumniMeet = await updateAlumniMeetService(
      id,
      newData,
      talkImages,
      talkVideo,
      deleteImagesUrls
    );
    res.status(200).json({
      success: true,
      message: "Alumni Meet updated successfully",
      data: updatedAlumniMeet,
    });
  } catch (err: any) {
    console.log(err.message);
    next(err);
  }
};

export const updateMeetMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    console.log("chala");
    const Files = req.files as {
      images?: (Express.Multer.File & { path: string; filename: string })[];
      video?: (Express.Multer.File & { path: string; filename: string })[];
    };
    const images =
      Files?.images?.map((file) => ({
        image: file.path,
        imageId: file.filename,
      })) || [];

    const video: string = Files?.video?.[0]?.path || "";
    const videoId: string = Files?.video?.[0]?.filename || "";
    const updatedMeet = await updateMeetMediaService(
      images,
      video,
      videoId,
      id
    );
    res.status(200).json({
      success: true,
      message: "Alumni Meet updated successfully",
      data: updatedMeet,
    });
  } catch (err: any) {
    console.log(err.message);
    next(err);
  }
};

export const deleteMeetMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const imageIds: string[] = JSON.parse(req.body.imageIds);
    if (imageIds.length > 0) {
      await deleteFromCloudinary(imageIds as string[]);
    }
    const updatedMeet = await deleteMeetMediaService(imageIds, id);
    res.status(200).json({
      success: true,
      message: "Alumni Meet updated successfully",
      data: updatedMeet,
    });
  } catch (err: any) {
    console.log(err.message);
    next(err);
  }
};

export const deleteAlumniMeet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    console.log(id)
    const deletedAlumniMeet = await deleteAlumniMeetService(id);

    const imagesIds = deletedAlumniMeet?.media?.images.map(
      (image) => image.imageId
    );
    const videoId = deletedAlumniMeet?.media?.videoId;
    if (imagesIds) {
      await deleteFromCloudinary(imagesIds as string[]);
    }
    if (videoId) {
      await deleteFromCloudinary([videoId as string]);
    }
    res.status(200).json({
      success: true,
      message: "Alumni Meet deleted successfully",
    });
  } catch (err: any) {
    console.log(err.message);
    next(err);
  }
};


export const getMeetsOnFrontend = async(req:Request , res:Response , next:NextFunction)=>{
  try{
    
    const params = req.params.type
    const now = new Date()
    let meets;
  if(params === 'randomUpcomings'){
     meets = await alumniMeetModel.aggregate([
    {$match:{time:{$gt:now}}},
    {$sample:{size:1}}
  ])
  }
  if(params === 'allUpcomings'){
    
console.log("chaala")
     meets = await alumniMeetModel.aggregate([
    {$match:{time:{$gt:now}}},
    ])
    
  }
  if(params === 'randomPast'){
    meets = await alumniMeetModel.aggregate([
      {$match:{time:{$lt:now}}},
      {$sample:{size:3}}
    ])
  }
  if(params === 'allPast'){
    meets = await alumniMeetModel.aggregate([{$match:{time:{$lt:now}}}])
  }
  const populatedDoc = await alumniMeetModel.populate(meets, {
    path: "alumni",
  })
  res.status(200).json(populatedDoc)
  }catch(err:any){
    console.log(err.message)
    next(err)
  }
}



export const getSomeRandomAlumni = async(req:Request , res:Response , next:NextFunction)=>{
  try{
    const alumnis = await alumniModel.aggregate([
    {$sample:{size:4}}
  ])
  res.status(200).json(alumnis)
  }catch(err:any){
    console.log(err.message)
    next(err)
  }
}

export const addNewFeedback = async(req:Request , res:Response, next:NextFunction)=>{
  console.log(req.body)
  const {comment , name , company} = req.body
  try{
      const newFeedback = await addNewFeedbackService(name, company , comment)
  if(newFeedback){
    res.status(200).json({status:"succes", feeback:newFeedback})
  }
  }catch(err:any){
    console.log(err.message)
    next(err)
  }
}

export const fetchRandomFeedbacks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedbacks = await feebackModel.aggregate([
      { $sample: { size: 3 } }   
    ]);
    res.status(200).json({
      status: "success",
      feedbacks
    });
  } catch (err: any) {
    console.error("Error fetching feedbacks:", err.message);
    next(err);
  }
};

export const getTalksPagination = async(req:Request , res:Response , next:NextFunction)=>{
  try{
    console.log("chala")
     const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
  const data = await getTalksPaginationService(page, limit)
  console.log(data)
  return res.status(200).json({status:"success", ...data})
  }catch(err:any){
    console.log("Error fetching talks : " , err)
    next(err)
  }
}

export const feedbackPagination = async(req:Request , res:Response , next:NextFunction)=>{
  try{
    console.log("aaya")
  const {page , limit} = req.query
  const data = await feedbackPaginationService(Number(page), Number(limit))
  return res.status(200).json({status:"success", ...data})
  }catch(err:any){
    console.log("Error fetching feedbacks : ", err)
    next(err)
  }

}