import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from "react-router-bootstrap"
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

import { logout } from '../actions/userActions'

const Header = ({}) => {
    const dispatch = useDispatch()
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo,loginSuccess } = userLogin

    const logoutHandler = () => {
        toast.dark('Successfully Logged Out!')
        dispatch(logout())
    }
    
    return (
        <header>
            <ToastContainer/>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to={loginSuccess?'/homepage':'/'}>
                        <Navbar.Brand>Book My Conference</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {userInfo ? <NavDropdown title={userInfo.username} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown> :
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <i className="fas fa-user"></i>
                                    Sign In
                                </Nav.Link>
                                </LinkContainer>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
