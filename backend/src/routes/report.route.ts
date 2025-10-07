import express from "express";
import { talkReport } from "../controller/report.controller";
import { authMiddleware } from "../middleware/auth";
const router = express.Router()

console.log("chala")
router.post("/" ,authMiddleware, talkReport)

export default router