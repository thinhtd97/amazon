import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import Message from '../components/Message'
import { getProfileUser, profileUpdate } from '../actions/userActions'
import { myListOrders } from '../actions/orderActions'
import { ORDER_MY_LIST_RESET } from '../contstants/orderConstants'


const ProfileScreen = ({ history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const userDetail = useSelector(state => state.userDetail)
    const { user, error } = userDetail

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userProfileUpdate = useSelector(state => state.userProfileUpdate)
    const { success } = userProfileUpdate

    const myListOrder = useSelector(state => state.myListOrder)
    const { orders } = myListOrder

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage("Password don't match")
        } else {
            // Update Profile
            dispatch(profileUpdate({name, email, password}))
        }
    }

    useEffect(() => {
        if(!userInfo) {
            history.push('/signin')
        } else {
            if(!user || !user.name) {
                dispatch(getProfileUser('profile'))
                dispatch({ type: ORDER_MY_LIST_RESET })
                dispatch(myListOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
        
       
    }, [dispatch, user, history, userInfo])

    return (
        <Row>
            <Col md={3}>
                <h3>Profile</h3>
                {error && <Message variant="danger"> {error} </Message>}
                {message && (<Message variant="danger"> {message} </Message>)}
                {success && (<Message> Update Profile Successfully </Message>)}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="Name">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="Email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={email} placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="Password">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="ConfirmPassword">
                        <Form.Label>ConfirmPassword:</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h3>My orders</h3>
                {orders && orders.length > 0 ? (
                    <Table striped responsive hover bordered className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders ? orders.map(order => (
                            <tr key={order._id}>
                                <td> {order._id} </td>
                                <td> {order.createdAt.substring(0, 10)} </td>
                                <td> ${order.totalPrice} </td>
                                <td style={{textAlign: 'center'}}> {order.isPaid ? order.paidAt.substring(0, 10) : (
                                    <i className="fas fa-times" style={{color: 'red', margin: '0'}}></i>
                                )} 
                                </td>
                                <td style={{textAlign: 'center'}}> {order.isDelivery ? order.deliveryAt.substring(0, 10) : (
                                    <i className="fas fa-times" style={{color: 'red', margin: '0'}}></i>
                                )} 
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className="btn-sm" variant="light">Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        )) : (<></>)}
                    </tbody>
                </Table>
                ) : (
                    <Message>No orders</Message>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
