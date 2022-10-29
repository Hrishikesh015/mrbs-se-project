const mongoose = require('mongoose')

const connectDB = async() => {
    await mongoose.connect('mongodb+srv://admin:Hrishi07@cluster0.3b09hac.mongodb.net/?retryWrites=true&w=majority')
    console.log('MongoDb connected')
}

module.exports = connectDB;