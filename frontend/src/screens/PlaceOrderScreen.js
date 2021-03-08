import React, { useEffect, useState } from 'react'
import CheckOutSteps from '../components/CheckOutSteps'
import { createOrderAction } from '../actions/orderActions'
import { useSelector, useDispatch } from 'react-redux'
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PlaceOrderScreen = ({ history }) => {

    const dispatch = useDispatch()

    const [success, setSuccess] = useState(false)

    const cart = useSelector(state => state.cart)
    const { paymentMethod, shippingAddress, cartItems } = cart

    const orderCreate = useSelector(state => state.orderCreate)
    const { order } = orderCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const addDecimals = (num) => {
        return (Math.round(num * 100)/100).toFixed(2)
    }

    const itemPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    const taxPrice = addDecimals(Number(itemPrice * 0.15).toFixed(2))
    const shippingPrice = itemPrice > 100 ? 0 : 100
    const totalPrice = (Number(itemPrice) + Number(taxPrice) + Number(shippingPrice)).toFixed(2)

    const placeOrderHandler = async (e) => {
        e.preventDefault()
        await dispatch(createOrderAction({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            shippingPrice: shippingPrice,
            itemsPrice: itemPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice
        }))
        setSuccess(true)
        
    }

    useEffect(() => {
        if(!userInfo) {
           history.push('/signin') 
        } else {
            if(!paymentMethod) {
                history.push('/payment')
            }
            if(success) {
                history.push(`/order/${order._id}`)
                setSuccess(false)
            }
            
        }
        
    }, [paymentMethod, history, order, userInfo, success])
    return (
        <>
            <CheckOutSteps step1 step2 step3 step4 />   
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            Address: {`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.country}`}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            Method: {paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            <ListGroup variant="flush">
                                {cartItems.map((item) => (
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
                                <h2>ORDER SUMMARY</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${itemPrice.toFixed(2)} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shiping:</Col>
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${totalPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                               <Button type="submit" className="btn btn-block" onClick={placeOrderHandler}>
                                   PLACE ORDER
                               </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
