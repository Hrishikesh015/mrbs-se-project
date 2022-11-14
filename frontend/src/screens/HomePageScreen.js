import React, { useEffect } from 'react'
import MeetingRoom from '../components/MeetingRoom'
import { Row, Col } from 'react-bootstrap'

import { listMeetingRooms,meetingRoomReset } from '../actions/meetingRoomActions'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = ({location, history}) => {
    const dispatch = useDispatch()
    const meetingRoomList = useSelector(state => state.meetingRoomList)
    const { loading, error, meetingRooms } = meetingRoomList
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    useEffect(() => {
        dispatch(meetingRoomReset())
        dispatch(listMeetingRooms())
    }, [dispatch])
    return (
        <>
            {!userInfo && history.push('/login')}
            <h1>MEETING ROOMS:</h1>
            {loading ? <Loader /> : error
                ? <Message variant='danger'>{error}</Message>
                : <Row>
                    {
                        meetingRooms.map(room => (
                            <Col key={room._id} sm={12} md={6} lg={4} xl={3}>
                                <MeetingRoom room={room}/>
                            </Col>
                        ))
                    }
                </Row>
            }
        </>
    )
}

export default HomeScreen
