import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [keepLoggedIn, setKeepLoggedIn] = useState(false)
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo,loginSuccess } = userLogin

    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
        if(loginSuccess)
            history.push('/homepage')
    }, [history, userInfo, redirect,loginSuccess])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password, keepLoggedIn))
    }
    const resetHandler = (e) => {
        e.preventDefault()
        setEmail('')
        setPassword('')
        setKeepLoggedIn(false)
    }
    return (
        <div>
            <FormContainer>
                <h1>Sign In</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler} onReset={resetHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='keepLoggedIn'>
                        <Form.Check type='checkbox' label='Remember me' value={keepLoggedIn} onChange={e => setKeepLoggedIn(!keepLoggedIn)} />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Button type='submit' variant='primary'>Sign In</Button>
                        </Col>
                        <Col>
                            <Button type='reset' variant='primary'>Reset</Button>
                        </Col>
                    </Row>
                </Form>
                <Row className='py-3'>
                    <Col>
                        New Customer?{' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register Here</Link>
                    </Col>
                    <Col>
                        <Link to={redirect ? `/forgotpassword?redirect=${redirect}` : '/forgotpassword'}>Forgot Password?</Link>
                    </Col>
                </Row>
            </FormContainer>
        </div>
    )
}

export default LoginScreen
