import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

import features from './data/features.js'
import users from './data/users.js'
import meetingrooms from './data/meetingRooms.js'
import Feature from './models/featureModel.js'
import User from './models/userModel.js'
import MeetingRoom from './models/meetingRoomModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Feature.deleteMany()
        await User.deleteMany()
        await MeetingRoom.deleteMany()

        await Feature.insertMany(features)
        await User.insertMany(users)
        await MeetingRoom.insertMany(meetingrooms)
        console.log('Data Imported!'.green.inverse)
        process.exit()
    }
    catch (err) {
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
}
const destroyData = async () => {
    try {
        await Feature.deleteMany()
        await User.deleteMany()
        await MeetingRoom.deleteMany()
        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    }
    catch (err) {
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
}
else {
    importData()
}