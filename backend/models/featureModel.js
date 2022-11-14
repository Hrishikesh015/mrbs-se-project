import mongoose from 'mongoose'

const featureSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Feature = mongoose.model('Feature', featureSchema)

export default Feature