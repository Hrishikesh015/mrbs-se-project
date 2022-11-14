import React from 'react'
import { Card } from "react-bootstrap"

const Feature = ({ feature }) => {
    return (
        <Card className="my-3 py-3 rounded">
            <Card.Img src={feature.image} variant='top'></Card.Img>
            <Card.Body>
                <Card.Title as='div'><strong>{feature.name}</strong></Card.Title>
                <Card.Text as='p'>{feature.description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Feature
