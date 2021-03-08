import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import { ListGroup, Row, Col, Image, Card, Button } from 'react-bootstrap'
import Message from '../components/Message'
import axios from 'axios'
import Loader from '../components/Loader'
import { detailsOrderAction, updateToDeliveryAction, updateToPayAction } from '../actions/orderActions'
import { Link } from 'react-router-dom'

const OrderScreen = ({ match, history }) => {

    const [sdkReady, setSdkReady] = useState(false)

    const orderId = match.params.id 
    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading: loadingDetails, error: errorDetails } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { success: successPay, loading: loadingPay } = orderPay

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderDelivery = useSelector((state) => state.orderDelivery)
    const { success: successDelivery } = orderDelivery

    const orderHandler = (paymentResult) => {
        dispatch(updateToPayAction(orderId, paymentResult))
    }

    const deliveryHandler = (id) => {
        dispatch(updateToDeliveryAction(id))
    }

    useEffect(() => {
        const addScriptPaypal = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if(!userInfo) {
            history.push('/signin')
        } else {
            // if(!order || successPay) {
            //     dispatch({ type: ORDER_UPDATE_TO_PAID_RESET })
            //     dispatch(detailsOrderAction(orderId))
            // } else if (!order.isPaid) {
            //     if(!window.paypal) {
            //         addScriptPaypal()
            //     } else {
            //         setSdkReady(true)
            //     }
            // }
            dispatch(detailsOrderAction(orderId))
            addScriptPaypal()
        }
    }, [dispatch, orderId, history, successPay, userInfo, successDelivery])


    return loadingDetails ? <Loader /> : errorDetails ? <Message variant="danger"> {errorDetails} </Message> : (
       <>
        <h2 className="my-4">Order {order && order._id} </h2>
       {order ? ( <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h4>Shipping</h4>
                        <p>Name: {order.user.name}</p>
                        <p>Address: {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}</p>
                        <p>Email: <Link to={`mailto: ${order.user.email}`}>{order.user.email}</Link> </p>
                        
                        {order.isDelivery ? (
                            <Message>
                                Delivered on {order.deliveryAt}
                            </Message>
                        ) : (
                            <Message variant="danger">
                                Not Delivery
                            </Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h4>Payment Method</h4>
                        <p>Method: {order.paymentMethod}</p>

                        {order.isPaid ? (
                            <Message>
                                Paid on {order.paidAt}
                            </Message>
                        ) : (
                            <Message variant="danger">
                                Not Paid
                            </Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h4>Order Items</h4>
                        <ListGroup variant="flush">
                        {order.orderItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={6}>
                                        <Link to={`/product/${item.product}`}> {item.name} </Link>
                                    </Col>
                                    <Col md={5}>
                                        <strong>{item.price} * {item.qty} = ${item.price * item.qty}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                        </ListGroup>
                       
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h4>Order Summary</h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col> ${order.itemsPrice.toFixed(2)} </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col> ${order.shippingPrice} </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col> ${order.taxPrice} </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col> ${order.totalPrice} </Col>
                            </Row>
                        </ListGroup.Item>
                        
                        {!order.isPaid && (
                        <ListGroup.Item>
                            {loadingPay && (<Loader />)}
                            {!sdkReady ? (<Loader />) : userInfo._id.toString() === order.user._id.toString() ? (
                                <PayPalButton amount={order.totalPrice} onSuccess={orderHandler} />
                            ) : (<></>)}
                            
                        </ListGroup.Item>
                        )}
                        {userInfo.isAdmin && (
                            <>
                            {!order.isDelivery && order.isPaid && (
                                <ListGroup.Item>
                                    <Button onClick={() => deliveryHandler(order._id)} className="btn btn-block">Mark as delivered  </Button>
                                </ListGroup.Item>
                            )}
                            </>
                        )}
                       
                        
                    </ListGroup>
                </Card>
            </Col>
        </Row>) : (<></>)}
 
       
        </>
    )
}

export default OrderScreen
