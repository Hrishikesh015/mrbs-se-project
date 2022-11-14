import asyncHandler from 'express-async-handler'
import MeetingRoom from '../models/meetingRoomModel.js'
import generateToken from '../utils/generateTokens.js'

import moment from 'moment'

const today = moment(new Date()).format('yyyy-MM-DD[T]HH:mm')

//@desc get all meeting rooms
//@route GET /api/meetingRooms
//@access Private
const getMeetingRooms = asyncHandler(async (req, res) => {
    const meetingRooms = await MeetingRoom.find({})
    if (meetingRooms) {
        res.json(meetingRooms)
    }
    else {
        res.status(404)
        throw new Error('Cannot get meeting rooms')
    }
})

//@desc  get a meeting room by Id
//@route GET /api/meetingRooms/id
//@access Private
const getMeetingRoomById = asyncHandler(async (req, res) => {
    const meetingRoom = await MeetingRoom.findById(req.params.id)
    if (meetingRoom) {
        res.json(meetingRoom)
    }
    else {
        res.status(404)
        throw new Error('Cannot get meeting room')
    }
})

//@desc  Get meeting room availability by Id
//@route POST /api/meetingRooms/availability/id
//@access Private
const getAvailabilityById = asyncHandler(async (req, res) => {
    const { startDateTime, endDateTime } = req.body

    const meetingRoom = await MeetingRoom.findById(req.params.id)
    if (meetingRoom) {
        const bookedTimes = meetingRoom.bookedTimes
        const isAvailable = bookedTimes.every((time) => {
            return (((startDateTime < time.startDate) && (endDateTime < time.startDate)) || ((startDateTime > time.endDate) && (endDateTime > time.endDate)))
        })
        res.json(isAvailable)
    }
    else {
        res.status(404)
        throw new Error('Cannot get meeting room')
    }
})

//@desc  Book meeting room 
//@route PUT /api/meetingRooms/book/:id
//@access Private
const bookMeetingRoom = asyncHandler(async (req, res) => {
    const { startDateTime, endDateTime, userid, purposeOfBooking } = req.body
    const meetingRoom = await MeetingRoom.findById(req.params.id)
    if (meetingRoom) {
        meetingRoom.bookedTimes.push({
            startDate: startDateTime,
            endDate: endDateTime,
            bookedBy: userid,
            purposeOfBooking
        })
        const updatedMeetingRoom = await meetingRoom.save()
        res.json(updatedMeetingRoom)
    }
    else {
        res.status(404)
        throw new Error('Cannot get meeting room')
    }
})

//@desc  Get user's meetings
//@route PUT /api/meetingRooms/myMeetings/:id
//@access Private
const getMyMeetings = asyncHandler(async (req, res) => {
    const meetingRooms = await MeetingRoom.find({})
    if (meetingRooms) {
        var myMeetings = []
        meetingRooms.map((room) => {
            room.bookedTimes.map((booking) => {
                if (booking.bookedBy == req.params.id) {
                    myMeetings.push({
                        id: booking._id,
                        room: room._id,
                        roomName: room.roomName,
                        startDateTime: booking.startDate,
                        endDateTime: booking.endDate,
                        purposeOfBooking: booking.purposeOfBooking
                    })
                }
            })
        })
        myMeetings.sort((a, b) => (a.startDateTime > b.startDateTime) ? 1 : ((b.startDateTime > a.startDateTime) ? -1 : 0))
        myMeetings = myMeetings.filter((meets) => meets.startDateTime > today)
        res.json(myMeetings)
    }
    else {
        res.status(404)
        throw new Error('Cannot get meeting room')
    }
})

//@desc  Delete meetings
//@route DELETE /api/meetingRooms/deleteMeeting/:id
//@access Private
const deleteMeeting = asyncHandler(async (req, res) => {
    const { roomId } = req.body
    const meetingRoom = await MeetingRoom.findById(roomId)
    if (meetingRoom) {
        meetingRoom.bookedTimes = meetingRoom.bookedTimes.filter((booking) => booking._id != req.params.id)
        const updatedMeetingRoom = await meetingRoom.save()
        res.json(updatedMeetingRoom)
    }
    else {
        res.status(404)
        throw new Error('Cannot get meeting room')
    }
})

export { getMeetingRooms, getMeetingRoomById, getAvailabilityById, bookMeetingRoom, getMyMeetings, deleteMeeting }