import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { login } from '../actions/userActions'

const LoginScreen = ({ history, location }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {  error, userInfo } = userLogin
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])


    return (
        <FormContainer>
            <h3>Signin</h3>
            {error && <Message variant="danger"> {error} </Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="Email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="Password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">login</Button>
            </Form>
            <Row className="py-3">
                <Col>New customer? <Link to="/signup"> Signup </Link></Col> 
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
