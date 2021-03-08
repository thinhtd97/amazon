import express from 'express'
import { 
    authUser, 
    getProfile, 
    registerUser, 
    updateProfileUser,
    getAllUsers, 
    getUserByID,
    deleteUserByID,
    updateUserByID} from '../controllers/userControllers.js'
import { admin } from '../middleware/authMiddleware.js'
import { protect } from '../middleware/middlewares.js'
const router = express.Router()

router.route('/login').post(authUser)
router.route('/').post(registerUser).get(protect, admin, getAllUsers)
router.route('/profile').get(protect, getProfile).put(protect, updateProfileUser)
router.route('/:id').get(protect, admin, getUserByID).delete(protect, admin, deleteUserByID).put(protect, admin, updateUserByID)

export default router 