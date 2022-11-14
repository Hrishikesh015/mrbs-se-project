import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'

import Feature from '../components/Feature'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listFeatures } from '../actions/featureActions'

const LandingPageScreen = ({location, history}) => {
    const dispatch = useDispatch()
    const featureList = useSelector(state => state.featureList)
    const { loading, error, features } = featureList
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    useEffect(() => {
        if(userInfo)
            history.push('/homepage')
        dispatch(listFeatures())
    }, [dispatch, history,userInfo])
    return (
        <div>
            <h4>Welcome to BMC</h4>
            <p>Book My Conference is a MERN based meeting room booking software which allows users to seamlessly book meeting or conference rooms for their upcoming events. <br/><br/><h5>Login or Sign-up to get started</h5></p><br/>
            <h5>Features of BMC:</h5>
            {loading ? <Loader /> : error
                ? <Message variant='danger'>{error}</Message>
                : <Row>
                    {
                        features.map(feature => (
                            <Col key={feature._id}>
                                <Feature feature={feature} />
                            </Col>
                        ))
                    }
                </Row>
            }
        </div>
    )
}

export default LandingPageScreen
