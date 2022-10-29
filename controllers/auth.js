const User = require('../models/User')

exports.register = async (req, res, next) => {
    const {uname, email, password} = req.body

    try {
        const user = await User.create({
            uname, 
            email, 
            password,
        })

        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}
exports.login = async (req, res, next) => {
    const {email, password} = req.body

    if(!email || !password) {
        res.status(400).json({ success: false, error: "Please provide email and password"})
    }

    try {
        const user = await User.findOne({ email }).select("+password")

        if(!user) {
            res.status(404).json({ success: false, error: "Invalid Credentials"})
        }

        const isMatch = await user.matchPassword(password)

        if(!isMatch) {
            res.status(404).json({success: false, error: "Invalid Credentials"})
        }

        res.status(201).json({
            success: true,
            token: "23sfefassf",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
exports.forgotpassword = (req, res, next) => {
    res.send("Forgot password route")
}
exports.resetpassword = (req, res, next) => {
    res.send("Reset password route")
}