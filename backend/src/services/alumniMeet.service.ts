import {
  addFeedbackDao,
  addNewAlumniDao,
  checkAlumniByIdDao,
  checkAlumniMeetsDaoByAlumniId,
  checkAlumniMeetsDaoByid,
  createNewAlumniMeetDao,
  deleteAlumniDao,
  deleteAlumniMeetDao,
  feedbackPaginationDao,
  findAlumniByIdDao,
  getAllAlumniDao,
  getAllAlumniMeetsDao,
  getTalksOnFrontendDao,
  getTalksPaginationDao,
  updateAlumniDao,
  updateAlumniMeetDao,
  updateMeetMediaDao,
} from "../dao/alumniMeet.dao";
import alumniModel from "../model/alumni.model";
import { AlumniInput, AlumniMeetInput } from "../types/interface";
import { Alumni, alumniMeetDocument, feedback } from "../types/model.interface";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../utility/customErrors";
import { deleteFromCloudinary } from "../utility/cloudnaryDeletion";
import mongoose from "mongoose";
import { deleteMeetMedia } from "../controller/alumniMeet.controller";

export const getAllAlumniListService = async (): Promise<Alumni[]> => {
  const alumniList = await getAllAlumniDao();

  return alumniList;
};

export const addNewAlumniService = async (
  data: AlumniInput
): Promise<Alumni> => {
  const requiredFields: { [key: string]: string } = {
    name: "Please enter your full name",
    batch: "Please enter your batch",
    email: "Please enter your email address",
    currentCompany: "Please enter your current company",
    currentRole: "Please enter your current role",
    achievement: "Please enter at least one achievement",
  };

  for (const field of Object.keys(requiredFields)) {
    if (!data[field as keyof AlumniInput]) {
      throw new ValidationError(requiredFields[field]);
    }
  }
  console.log(data)

  if (!data.profilePic || data.profilePic === 'null')
    throw new ValidationError("Please upload a profile picture");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email))
    throw new ValidationError("Please enter a valid email address");

  if (
    data.linkedIn &&
    !/^https:\/\/(www\.)?linkedin\.com\/.*$/.test(data.linkedIn)
  )
    throw new ValidationError("Please enter a valid LinkedIn profile link");

  if (!Array.isArray(data.careerTimeline) || data.careerTimeline.length === 0)
    throw new ValidationError("Please add at least one career timeline entry");

  for (const step of data.careerTimeline) {
    if (!step.year || !step.role || !step.company || !step.location)
      throw new ValidationError(
        "Each career step must include year, role, company, and location"
      );
  }

  const isEmailExist = await alumniModel.findOne({ email: data.email });
  if (isEmailExist)
    throw new ConflictError(
      "This email is already registered. Try another one."
    );

  try {
    return await addNewAlumniDao(data);
  } catch (err) {
    if (data.fileName) await deleteFromCloudinary(data.fileName as string);
    throw err;
  }
};

export const createNewAlumniMeetService = async (
  data: AlumniMeetInput
): Promise<alumniMeetDocument> => {
  try {
   if (!data.title || typeof data.title !== "string" || data.title.trim().length < 3) {
  throw new ValidationError("Your event title looks too short. Please enter at least 3 characters.");
}

if (!data.organizedBy || data.organizedBy.trim().length < 2) {
  throw new ValidationError("Please enter the organizer’s name.");
}

if (!data.location || data.location.trim().length < 2) {
  throw new ValidationError("Please add a venue for this talk.");
}

if(!data.description){
  throw new ValidationError("Please add a description for this talk.")
}

if (data.description && data.description.length > 1000) {
  throw new ValidationError("The description is a bit too long. Keep it under 1000 characters.");
}

if (!data.time || isNaN(new Date(data.time).getTime())) {
  throw new ValidationError("Please pick a valid date and time for the event.");
}

if (!data.alumni || data.alumni === 'null' || !mongoose.Types.ObjectId.isValid(data.alumni)) {
  throw new ValidationError("Select an alumni from the list before continuing.");
}

if (
  data.classJoined &&
  data.classJoined.some(
    (cls: string) => !cls || typeof cls !== "string" || cls.trim().length < 2
  )
) {
  throw new ValidationError("One or more class names don’t look right. Please check them.");
}


if (data.media.videoLink && typeof data.media.videoLink !== "string") {
  throw new ValidationError("That doesn’t look like a valid video link. Please check and try again.");
}

    data.title = data.title.trim();
    data.organizedBy = data.organizedBy.trim();
    data.location = data.location.trim();
    data.description = data.description?.trim();

    const newAlumniMeet = await createNewAlumniMeetDao(data);
    return newAlumniMeet;
  } catch (e) {
    await Promise.all(
      data.media.images.map(async (image) => {
        await deleteFromCloudinary(image.imageId);
      })
    );
    if (data.media.videoId) {
      await deleteFromCloudinary(data.media.videoId);
    }
    throw e;
  }
};

export const deleteAlumniService = async (id: string): Promise<Alumni> => {
  const isAlumniExist = await checkAlumniByIdDao(id);

  if (!isAlumniExist) {
    throw new NotFoundError("Can't delete alumni. Alumni not exist");
  }
  const isMeetsExist = await checkAlumniMeetsDaoByAlumniId(id);
  if (isMeetsExist) {
    throw new BadRequestError(
      "Cannot delete alumni. Alumni is associated with a meet."
    );
  }
  const deletedAlumni = await deleteAlumniDao(id);
  if (!deletedAlumni)
    throw new NotFoundError(
      "Deletion failed. Alumni may have already been deleted."
    );

  return deletedAlumni;
};

export const updateAlumniService = async (
  id: string,
  data: AlumniInput
): Promise<Alumni> => {
  const requiredFields: { [key: string]: string } = {
    name: "Please enter your full name",
    batch: "Please enter your batch",
    email: "Please enter your email address",
    currentCompany: "Please enter your current company",
    currentRole: "Please enter your current role",
    achievement: "Please enter at least one achievement",
  };

  for (const field of Object.keys(requiredFields)) {
    if (!data[field as keyof AlumniInput]) {
      throw new ValidationError(requiredFields[field]);
    }
  }
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new NotFoundError("Invalid alumni ID");

  //  Parse JSON
  let parsedCareerTimeline, parsedAchievements;
  try {
    parsedCareerTimeline = JSON.parse(data.careerTimeline as unknown as string);
    parsedAchievements = JSON.parse(data.achievements as unknown as string);
  } catch {
    throw new ValidationError(
      "Invalid JSON format for career timeline or achievements"
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email))
    throw new ValidationError("Please enter a valid email address");

  if (
    data.linkedIn &&
    !/^https:\/\/(www\.)?linkedin\.com\/.*$/.test(data.linkedIn)
  )
    throw new ValidationError("Please enter a valid LinkedIn profile link");

  if (!Array.isArray(parsedCareerTimeline) || parsedCareerTimeline.length === 0)
    throw new ValidationError("Please add at least one career timeline entry");

  for (const step of parsedCareerTimeline) {
    if (!step.year || !step.role || !step.company || !step.location)
      throw new ValidationError(
        "Each career step must include year, role, company, and location"
      );
  }

  const oldAlumni = await findAlumniByIdDao(id);
  if (!oldAlumni)
    throw new NotFoundError("Cannot update alumni. Alumni not exist");

  // Delete old profile picture if new one uploaded
  if (data.profilePic && oldAlumni.fileName) {
    await deleteFromCloudinary(oldAlumni.fileName as string);
  }

  try {
    return (await updateAlumniDao(id, {
      ...data,
      careerTimeline: parsedCareerTimeline,
      achievements: parsedAchievements,
    })) as Alumni;
  } catch (err) {
    throw err;
  }
};

export const getAllAlumniMeetsService = async (): Promise<
  alumniMeetDocument[]
> => {
  const alumniMeets = await getAllAlumniMeetsDao();
  return alumniMeets;
};

export const updateAlumniMeetService = async (
  id: string,
  data: AlumniMeetInput,
  talkImages : {imageId:string , image:string},
  talkVideo : {videoId:string , videoLink:string}[],
  deleteImages: string[]
): Promise<alumniMeetDocument> => {
   if (!data.title || typeof data.title !== "string" || data.title.trim().length < 3) {
  throw new ValidationError("Your event title looks too short. Please enter at least 3 characters.");
}

if (!data.organizedBy || data.organizedBy.trim().length < 2) {
  throw new ValidationError("Please enter the organizer’s name.");
}

if (!data.location || data.location.trim().length < 2) {
  throw new ValidationError("Please add a venue for this talk.");
}

if(!data.description){
  throw new ValidationError("Please add a description for this talk.")
}

if (data.description && data.description.length > 1000) {
  throw new ValidationError("The description is a bit too long. Keep it under 1000 characters.");
}

if (!data.time || isNaN(new Date(data.time).getTime())) {
  throw new ValidationError("Please pick a valid date and time for the event.");
}



if (
  data.classJoined &&
  data.classJoined.some(
    (cls: string) => !cls || typeof cls !== "string" || cls.trim().length < 2
  )
) {
  throw new ValidationError("One or more class names don’t look right. Please check them.");
}


  
  data.title = data.title.trim();
  data.organizedBy = data.organizedBy.trim();
  data.location = data.location.trim();
  data.description = data.description?.trim();
  console.log(id)
  const isAlumniMeetExist = await checkAlumniMeetsDaoByid(id);
  if (!isAlumniMeetExist) {
    throw new Error("Cannot update alumni meet. Alumni meet not exist");
  }
  const updatedAlumniMeet = await updateAlumniMeetDao(id, data,talkImages,talkVideo, deleteImages);
  if (!updatedAlumniMeet) throw new Error("Updation failed !.");
  return updatedAlumniMeet;
};

export const updateMeetMediaService = async (
  images: [],
  video: string,
  videoId: string,
  id: string
) => {
  try {
    const updatedMeet = await updateMeetMediaDao(images, video, videoId, id);

    return updatedMeet;
  } catch (err) {
    await Promise.all(
      images.map(async (image) => {
        await deleteFromCloudinary((image as any).imageId);
      })
    );
    if (videoId) {
      await deleteFromCloudinary(videoId);
    }
    throw err;
  }
};

export const deleteMeetMediaService = async (
  imageIds: string[],
  id: string
) => {
  try {
    if (imageIds.length === 0) return;
    const isExist = await checkAlumniMeetsDao(id);
    if (!isExist) throw new Error("Cannot delete media. Meet not exist");
    const updatedMeet = await deleteMeetMediaDao(imageIds, id);
    if (!updatedMeet) throw new Error("Deletion failed !.");
    return updatedMeet;
  } catch (err: any) {
    throw err;
  }
};

export const deleteAlumniMeetService = async (
  id: string
): Promise<alumniMeetDocument> => {
  const isAlumniMeetExist = await checkAlumniMeetsDaoByid(id);
  console.log(isAlumniMeetExist);
  if (!isAlumniMeetExist) {
    throw new Error("Cannot delete alumni meet. Alumni meet not exist");
  }

  const deletedAlumniMeet = await deleteAlumniMeetDao(id);
  if (!deletedAlumniMeet)
    throw new Error("Deletion failed. Alumni may have already been deleted.");
  return deletedAlumniMeet;
};

export const addNewFeedbackService = async (
  name: string,
  company: string,
  comment: string
): Promise<feedback> => {
  try {
    if (!name || name.trim().length === 0) {
      throw new Error("Name is required");
    }

    if (!company || company.trim().length === 0) {
      throw new Error("Company is required");
    }

    if (!comment || comment.trim().length === 0) {
      throw new Error("Comment is required");
    }

    
    if (comment.length > 500) {
      throw new Error("Comment cannot exceed 500 characters");
    }

    const newFeedback = await addFeedbackDao(name, company, comment);
    return newFeedback;
  } catch (err: any) {
    throw new Error(
      err.message || "Error in services while adding new feedback"
    );
  }
};

export const getTalksPaginationService = async (
  page: number = 1,
  limit: number = 3
) => {
  try {
    const now = new Date();
    const { talks, total } = await getTalksPaginationDao(page, limit, now);
    const totalPages = Math.ceil(total / limit);

    return {
      talks,
      total,
      page,
      totalPages,
      hasMore: page < totalPages,
    };
  } catch (err: any) {
    throw new Error(err.message || "Error in services while getting talks");
  }
};


export const feedbackPaginationService = async (page:number = 1 , limit:number=10)=>{
  const {feedbacks  , total} = await feedbackPaginationDao(page, limit)
  const totalPages = Math.ceil(total / limit)
  return {
    feedbacks,
    totalPages,
    page,
    hasMore :page<totalPages,
  }

}