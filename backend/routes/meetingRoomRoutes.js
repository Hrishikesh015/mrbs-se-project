import express from 'express'
const router = express.Router()
import { getMeetingRooms, getMeetingRoomById, getAvailabilityById, bookMeetingRoom, getMyMeetings,deleteMeeting } from '../controllers/meetingRoomController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getMeetingRooms)
router.route('/:id').get(protect, getMeetingRoomById)
router.route('/availability/:id').post(protect, getAvailabilityById)
router.route('/book/:id').put(protect, bookMeetingRoom)
router.route('/myMeetings/:id').get(protect, getMyMeetings)
router.route('/deleteMeeting/:id').put(protect, deleteMeeting)

export default router