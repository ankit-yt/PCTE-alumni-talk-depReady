import express, {Response , Request}  from "express";
import {  addNewAlumni, addNewAlumniMeet, addNewFeedback, deleteAlumni, deleteAlumniMeet, deleteMeetMedia, feedbackPagination, fetchRandomFeedbacks, getAllAlumni, getAllAlumniMeets, getMeetsOnFrontend, getSomeRandomAlumni, getTalksPagination, getUpcomingMeets, updateAlumni, updateAlumniMeet, updateMeetMedia } from "../controller/alumniMeet.controller";
import { alumniMeetUpload, profilePicUpload, profilePicWithBgUpload, } from "../middleware/multer";
import { authMiddleware } from "../middleware/auth";


const router = express.Router();

router.get("/" ,authMiddleware,getAllAlumni)
router.get("/allMeets" ,authMiddleware, getAllAlumniMeets)
router.post("/addNewAlumni",authMiddleware, profilePicWithBgUpload.single("profilePic")  , addNewAlumni)
router.delete("/deleteAlumni/:id",authMiddleware, deleteAlumni);
router.post("/addNewAlumniMeet",authMiddleware, alumniMeetUpload, addNewAlumniMeet );
router.put("/updateAlumni/:id" ,authMiddleware,profilePicWithBgUpload.single("profilePic")  , updateAlumni)
router.delete("/meet/:id" ,authMiddleware, deleteAlumniMeet)
router.put("/meet/:id",authMiddleware, alumniMeetUpload, updateAlumniMeet);
router.put("/meet/:id/mediaUpload" ,authMiddleware, alumniMeetUpload , updateMeetMedia)
router.delete("/meet/:id/mediaUpload" ,authMiddleware, deleteMeetMedia)

router.get("/fetchTalksOnFrontend/:type"  , getMeetsOnFrontend)
router.get('/getSomeRandomAlumni' , getSomeRandomAlumni)

router.get("/talkPagination" , getTalksPagination)

router.post("/feedback" , addNewFeedback)
router.get("/feedback", fetchRandomFeedbacks)
router.get("/allFeedback",authMiddleware, feedbackPagination)




export default router;