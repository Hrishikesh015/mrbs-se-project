import express from 'express'
const router = express.Router()
import { authUser, registerUser, getUserProfile, updateUserProfile, getUserExists } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router.route('/').post(registerUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/profileByEmail').post(getUserExists)

export default router