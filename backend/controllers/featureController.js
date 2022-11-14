import asyncHandler from 'express-async-handler'
import Feature from '../models/featureModel.js'

//@desc Fetch all features
//@route GET /api/features
//@access Public
const getFeatures = asyncHandler(async (req, res) => {
    const features = await Feature.find({})
    res.json(features)
})

export {
    getFeatures
}