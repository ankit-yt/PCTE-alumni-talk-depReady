import express from 'express'
import { adminRegister, getMe, login, logout } from '../controller/auth.controller'
import { adminPicUpload } from '../middleware/multer'
import { authMiddleware } from '../middleware/auth'
const router = express.Router()

router.get("/me"  , authMiddleware ,  getMe )
router.post("/register",adminPicUpload.single("avatar"), adminRegister)
router.post("/login", login)
router.get("/logout", logout)


export default router