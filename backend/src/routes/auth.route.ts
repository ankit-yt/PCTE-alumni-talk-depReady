import express from 'express'
const router = express.Router()


router.post("/register", adminRegister)
router.post("/login", adminLogin)
router.post("/logout", adminLogout)


export default router