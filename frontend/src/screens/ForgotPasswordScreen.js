import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const ForgotPasswordScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userReducer = useSelector(state => state.userReducer);
    const { loading, error, userExists } = userReducer;


    useEffect(() => {
        if (userExists) {
            setMessage(`Hi, ${userExists.username} ! An e-mail has been sent to ${userExists.email}`)
            setTimeout(() => {
                setMessage('')
            }, 5000)
        }
    }, [history, userExists]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(getUser(email))

    }
    const resetHandler = (e) => {
        e.preventDefault()
        setEmail('')
    }
    return (
        <div>
            <FormContainer>
                <h1>FORGOT PASSWORD</h1>
                {message && <Message variant='info'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler} onReset={resetHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Button type='submit' variant='primary'>RESET Password</Button>
                        </Col>
                        <Col>
                            <Button type='reset' variant='primary'>Reset</Button>
                        </Col>
                    </Row>
                </Form>
                <Row className='py-3'>
                    <Col>
                        <Link to='/login'>Signin here</Link>
                    </Col>
                </Row>
            </FormContainer>
        </div>
    )
}

export default ForgotPasswordScreen