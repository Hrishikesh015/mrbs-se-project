import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`MongoDB Connected: ${(await conn).connection.host}`.cyan.underline)
    }
    catch (err) {
        console.error(`Error: ${err.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB