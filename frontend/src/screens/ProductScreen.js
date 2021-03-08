import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { getProductDetails, productReviewAction } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ match, history }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviews = useSelector(state => state.productReviews)
    const { success: successReviews, error: errorReviews } = productReviews

    const addToCartHandler = (id) => {
        history.push(`/cart/${id}?qty=${qty}`)
    }

    const reviewHandler = (e) => {
        e.preventDefault()
        dispatch(productReviewAction({_id: product._id, comment, rating}))
    }

    useEffect(() => {
       dispatch(getProductDetails(match.params.id))
    }, [match, dispatch, successReviews])
    return (
        <>
            <Link className="btn btn-dark my-3" to="/"> Go Back </Link>
            {loading ? <Loader /> : error ? <Message variant="danger"> {error} </Message> : (
                <>
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                            <h2>{product.name}</h2> 
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} 
                                text={`${product.numReviews} reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Price:</strong></Col>
                                        <Col> <strong>${product.price}</strong> </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Status:</strong></Col>
                                        <Col> {product.countInStock > 0 
                                        ? "In Stock" : "Out Of Stock"} </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Quantity:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? (
                                                <Form.Control as="select" 
                                                value={qty} 
                                                onChange={(e) => setQty(e.target.value)}>
                                                    {[...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x+1} value={x+1}>
                                                            {x+1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            ) : (
                                                <Form.Control as="select">
                                                    <option>
                                                        0
                                                    </option>
                                                </Form.Control>
                                            )}
                                            
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button 
                                        disabled={product.countInStock === 0} 
                                        onClick={() => addToCartHandler(product._id)} 
                                        className="btn btn-dark btn-block">Add To Cart</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h2>Reviews</h2>
                        {errorReviews && <Message variant="danger"> {errorReviews} </Message>}
                        {product.reviews.length === 0 && (<Message> No reviews </Message>)}
                        <ListGroup variant="flush">
                            {product.reviews.map((r) => (
                                <ListGroup.Item key={r._id}>
                                    <strong> {r.name} </strong>
                                    <Rating value={r.rating} />
                                    <p> {r.createdAt.substring(0, 10)} </p>
                                    <strong> {r.comment} </strong>
                                </ListGroup.Item>
                                ))}
                                {userInfo && (
                                <ListGroup.Item>
                                    <Form onSubmit={reviewHandler}>
                                        <Form.Group>
                                            <Form.Label>Rating: </Form.Label>
                                            <Form.Control as="select" 
                                            onChange={(e) => setRating(e.target.value)}>
                                                <option value={1}>1 - Poor</option>
                                                <option value={2}>2 - Fair</option>
                                                <option value={3}>3 - Good</option>
                                                <option value={4}>4 - Very Good</option>
                                                <option value={5}>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Comment:</Form.Label>
                                            <Form.Control 
                                                required 
                                                onChange={(e) => setComment(e.target.value)} 
                                                placeholder="Comment" as="textarea"></Form.Control>
                                        </Form.Group>
                                        <Button type="submit">Comment</Button>
                                    </Form>
                                </ListGroup.Item>)}
                                
                        </ListGroup>
                    </Col>
                </Row>
                </>
            )} 
        </>
    )
}

export default ProductScreen
