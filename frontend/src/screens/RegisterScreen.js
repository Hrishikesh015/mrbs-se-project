import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const RegisterScreen = ({ location, history }) => {
    const [username, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userRegister = useSelector(state => state.userRegister)
    var { loading, error, userInfo } = userRegister


    useEffect(() => {
        setTimeout(() => { error = null }, 2000)
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        var regex = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)
        if (!regex.test(email))
            setMessage('Invalid format for email')
        else if (password.length < 8)
            setMessage('Password length should be atleast 8 characters')
        else if (password !== confirmPassword)
            setMessage('Passwords do not match')
        else
            dispatch(register(username, email, password))
    }

    const resetHandler = (e) => {
        e.preventDefault()
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} onReset={resetHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter name' value={username} onChange={e => { setMessage(''); setName(e.target.value) }}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => { setMessage(''); setEmail(e.target.value) }}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={e => { setMessage(''); setPassword(e.target.value) }}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={e => { setMessage(''); setConfirmPassword(e.target.value) }}></Form.Control>
                </Form.Group>
                <Row>
                    <Col>
                        <Button type='submit' variant='primary'>Sign Up</Button>
                    </Col>
                    <Col>
                        <Button type='reset' variant='primary'>Reset</Button>
                    </Col>
                </Row>

            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen