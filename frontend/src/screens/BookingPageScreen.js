import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { FaAngleLeft } from 'react-icons/fa'
import moment from 'moment'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { listMeetingRoomDetails, getAvailablityOfMeetingRoom, bookMeetingRoom, meetingRoomReset } from '../actions/meetingRoomActions'

const BookingPageScreen = ({ history, match }) => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const meetingRoomDetails = useSelector(state => state.meetingRoomDetails)
    const { loading, error, meetingRoom } = meetingRoomDetails
    const meetingRoomAvailable = useSelector(state => state.meetingRoomAvailable)
    const { loadingAvailability, available } = meetingRoomAvailable

    const [startDate, setStartDate] = useState(moment(moment(new Date()).add(40, 'm')).format('yyyy-MM-DD'))
    const [startTime, setStartTime] = useState(moment(moment(new Date()).add(40, 'm')).format('HH:mm'))
    const [endDate, setEndDate] = useState(moment(moment(new Date()).add(70, 'm')).format('yyyy-MM-DD'))
    const [endTime, setEndTime] = useState(moment(moment(new Date()).add(70, 'm')).format('HH:mm'))
    const [purposeOfBooking, setPurposeOfBooking] = useState('')
    const [message, setMessage] = useState(null)
    const [variant, setVariant] = useState('error')
    const [gotDetails, setGotDetails] = useState(false)

    useEffect(() => {
        setMessage(null)
        setVariant('error')
        if(!gotDetails){
            dispatch(listMeetingRoomDetails(match.params.id))
            setGotDetails(true)
        }
        if (!userInfo)
            history.push('/login')
        if(available){
            setVariant('info')
            setMessage('Meeting room available')
            setTimeout(()=>dispatch(meetingRoomReset()),5000)
            setTimeout(()=>setMessage(null),5000)
        }
        else if(available===false){
            setVariant('danger')
            setMessage('Meeting room unavailable') 
            setTimeout(()=>dispatch(meetingRoomReset()),5000)
            setTimeout(()=>setMessage(null),5000)
        }
    }, [dispatch, match, userInfo, history, meetingRoom,available])

    const submitHandler = (e) => {
        e.preventDefault()
        setMessage(null)
        var currentDateTime = moment(moment(new Date()).add(30, 'm')).format('yyyy-MM-DD[T]HH:mm')
        var startDateTime = startDate + "T" + startTime
        var endDateTime = endDate + "T" + endTime
        if (startDateTime <= currentDateTime){
            setMessage('Booking can only be made 30 minutes prior to current Time')
            setVariant('danger')
        }
        else if (endDateTime < startDateTime){
            setMessage('End Date/Time can not be before Start Date/Time')
            setVariant('danger')
        }
        else if (purposeOfBooking.replace(/\s/g, '').length <= 0){
            setMessage('Purpose of Meeting cannot be empty')
            setVariant('danger')
        }
        else {
            if (available) {
                dispatch(bookMeetingRoom(match.params.id, startDateTime, endDateTime, userInfo._id, purposeOfBooking))
                setMessage('Booking successful')
                toast.dark(`Booking successful for ${meetingRoom.roomName}`)
                setVariant('info')
                setPurposeOfBooking('')
                setTimeout(dispatch(meetingRoomReset()),5000)
            }
            else {
                dispatch(getAvailablityOfMeetingRoom(match.params.id, startDateTime, endDateTime))
                if(available===false){
                    setMessage('Meeting room unavailable') 
                    setVariant('danger')
                }
            }
        }
    }

    return (
        <>
            {!userInfo && history.push('/login')}
            <Link className='btn btn-dark my-3' to='/'>
                <FaAngleLeft />
            </Link>
            {
                (loading || loadingAvailability) ? <Loader />
                    : error ? (<Message variant='danger'>{error}</Message>)
                        : (
                            < Row >
                                <Col md={5}>
                                    <Image src={meetingRoom.image} alt={meetingRoom.roomName} fluid />
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item >
                                            {meetingRoom.roomName}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={6}>
                                    {message && <Message variant={variant}>{message}</Message>}
                                    <Card className='card bg-danger mb-3 rounded'>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Form onSubmit={submitHandler}>

                                                    <Form.Group controlId='startDateTime'>
                                                        <Form.Label>Start Date & Time</Form.Label>
                                                        <Form.Text className='text-muted'>
                                                            The Date & Time when your meet starts
                                                        </Form.Text>
                                                        <Form.Group controlId='startDate'>
                                                            <Form.Control type='date' value={startDate} onChange={e => setStartDate(e.target.value)}></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group controlId='startTime'>
                                                            <Form.Control type='time' value={startTime} onChange={e => setStartTime(e.target.value)}></Form.Control>
                                                        </Form.Group>
                                                    </Form.Group>


                                                    <Form.Group controlId='endDateTime'>
                                                        <Form.Label>End Date & Time</Form.Label>
                                                        <Form.Text className='text-muted'>
                                                            The Date & Time when your meet ends
                                                        </Form.Text>
                                                        <Form.Group controlId='startDate'>
                                                            <Form.Control type='date' value={endDate} onChange={e => setEndDate(e.target.value)}></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group controlId='startTime'>
                                                            <Form.Control type='time' value={endTime} onChange={e => setEndTime(e.target.value)}></Form.Control>
                                                        </Form.Group>
                                                    </Form.Group>

                                                    <Form.Group controlId='purposeOfBooking'>
                                                        <Form.Label>Purpose of meeting </Form.Label>
                                                        <Form.Control type='text' value={purposeOfBooking} onChange={e => setPurposeOfBooking(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    {!available ? (
                                                        <Button variant='primary' type='submit' className='my -3 py-3'>
                                                            GET availability
                                                        </Button>) : (
                                                        <Button variant='primary' type='submit' className='my -3 py-3'>
                                                            BOOK ROOM
                                                        </Button>
                                                    )}
                                                </Form>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        )
            }
        </>
    )
}

export default BookingPageScreen
