import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Table, Button } from 'react-bootstrap'
import { listOrders } from '../actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderList = useSelector(state => state.orderList)
    const { loading, orders, error } = orderList
    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin) {
            history.push('/signin')
        } else {
            dispatch(listOrders())
        }
    }, [dispatch, userInfo, history])
    return (
        <Row>
            <h3>Orders</h3>
            <Col md={12}>
                
                {loading ? <Loader /> : error ? <Message variant="danger"> {error} </Message> : (
                    <>
                    {orders.length === 0 ? <Message variant="danger"> Orders not found </Message> : (
                        <Table hover responsive bordered striped className="table-sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(p => (
                                    <tr key={p._id}>    
                                        <td> {p._id} </td>
                                        <td> {p.user.name} </td>
                                        <td> ${p.totalPrice} </td>
                                        <td> {p.createdAt.substring(0, 10)} </td>
                                        <td> {p.isPaid ? (p.paidAt.substring(0, 10)) : (<i className="fas fa-times" style={{color: 'red'}}></i>)} </td>
                                        <td> {p.isDelivery ? (p.deliveryAt.substring(0, 10)) : (<i className="fas fa-times" style={{color: 'red'}}></i>)} </td>
                                        <td>
                                        <LinkContainer to={`/order/${p._id}`}>
                                            <Button variant="light" className='btn-sm'>
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                    
                    </>
                )}
            </Col>
        </Row>
    )
}

export default OrderListScreen
