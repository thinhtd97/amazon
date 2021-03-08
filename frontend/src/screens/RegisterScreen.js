import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { register } from '../actions/userActions'

const RegisterScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { error, success } = userRegister
    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage("Password don't match")
        } else {
            dispatch(register(name, email, password))
        }
    }

    useEffect(() => {
        if(success) {
            history.push('/')
        }
    }, [success, history])


    return (
        <FormContainer>
            <h3>Signup</h3>
            {error && <Message variant="danger"> {error} </Message>}
            {message && <Message variant="danger"> {message} </Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="Name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="Email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="Password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="ConfirmPassword">
                    <Form.Label>ConfirmPassword:</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Signup</Button>
            </Form>
            <Row className="py-3">
                <Col>New customer? <Link to="/signin"> Signin </Link></Col> 
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
