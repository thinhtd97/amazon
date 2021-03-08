import asyncHandler from 'express-async-handler'
import generateToken from '../middleware/generateToken.js'
import User from '../models/userModel.js'

export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body 
    const user = await User.findOne({ email })
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid email or password")
    }
})
export const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("User Not Found")
    }
})

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const user = await User.findOne({ email })

    if(user) {
        res.status(400)
        throw new Error("Email already exists")
    } else {
        const userCreated = await User.create({
            name, 
            email,
            password
        })
        if(userCreated) {
            res.json({
                _id: userCreated._id,
                name: userCreated.name,
                email: userCreated.email,
                isAdmin: userCreated.isAdmin,
                token: generateToken(userCreated._id)
            })
        } else {
            res.status(400)
            throw new Error('Ivalid data')
        }
        
    }
})
export const updateProfileUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if(user) {
        user.name = req.body.name || user.name 
        user.email = req.body.email || user.email 
        if(req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(400)
        throw new Error("Update failed!")
    }
})

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    if(!users) {
        res.status(404)
        throw new Error('User not found')
    } else {
        res.json(users)
    }
})
export const getUserByID = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("User Not Found")
    }
})
export const deleteUserByID = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user) {
        await user.remove()
        res.json({ message: 'Remove Successfully' })
    } else {
        res.status(404)
        throw new Error("User Not Found")
    }
})
export const updateUserByID = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user) {
        user.name = req.body.name || user.name 
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin
    
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error("User Not Found")
    }
})