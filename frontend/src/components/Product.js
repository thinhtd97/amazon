import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'


const Product = ({product}) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} />  
            </Link>
            <Link to={`/product/${product._id}`}>
                <Card.Title as="div"> {product.name} </Card.Title>  
            </Link>
            <Card.Text as="div">
                <div className="my-3">
                    {product.rating.toFixed(1)} from {product.numReviews.toFixed(1)} reviews
                </div>
            </Card.Text>
            
            <Card.Text as="div">
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </Card.Text>
            <Card.Text as="h3">
                ${product.price}
            </Card.Text>
        </Card>
    )
}

export default Product
