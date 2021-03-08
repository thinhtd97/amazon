import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

export const admin = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.user.id);
   if(user.isAdmin) {
       next()
    } else {
        res.status(400)
        throw new Error('Access denied')
    }
})