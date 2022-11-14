import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const MeetingRoom = ({ room }) => {
    return (
        <>
            <Link to={`/meetingRooms/${room._id}`}>
                <Card className='my-3 py-3 rounded btn-outline-dark'>
                    <Card.Img src={room.image} variant='top'></Card.Img>
                    <Card.Body>
                        <Card.Title as='div'><strong>{room.roomName}</strong></Card.Title>
                        <Card.Subtitle className='mb-2 text-muted'>{`${room.location.address}, `}</Card.Subtitle>
                        <Card.Subtitle className='mb-2 text-muted'>{`${room.location.city} `}</Card.Subtitle>
                        <Card className='py-2 rounded'>
                            <Card.Text className='ml-4 text-muted'>Point of Contact</Card.Text>
                            <Card.Body>
                                <Card.Text as='h5' className='text-info'>{room.pointOfContact.name}</Card.Text>
                                <Card.Text className='text-muted'>{room.pointOfContact.mobile}</Card.Text>
                                <Card.Text className='text-muted p small-font'>{room.pointOfContact.email}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Card.Body>
                </Card>
            </Link >
        </>
    )
}

export default MeetingRoom
