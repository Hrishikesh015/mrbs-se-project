import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization
    if (token && token.startsWith('Bearer')) {
        try {
            const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        }
        catch (err) {
            console.log(err)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }
    else {
        res.status(401)
        throw new Error('Not Authorized, no token')
    }
})

export { protect }