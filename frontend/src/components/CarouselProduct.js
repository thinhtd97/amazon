import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsTop } from '../actions/productActions'

const CarouselProduct = () => {
    const productsTop = useSelector(state => state.productsTop)
    const { products } = productsTop

    const dispatch = useDispatch()
 
    useEffect(() => {
        dispatch(getProductsTop())
    }, [dispatch])

    return (
        <Carousel pause="hover" className="bg-dark d-flex">
            {products && products.map(product => (
                <Carousel.Item interval={1000}>
                    <Image
                    style={{margin: 'auto'}}
                    src={product.image}
                    alt={product.name}
                    fluid
                    />
                    <Carousel.Caption className="carousel-caption">
                        <h2>
                            {product.name} {product.price}
                        </h2>
                    </Carousel.Caption>
            </Carousel.Item>
            ))}
            
        </Carousel>
    )
}

export default CarouselProduct
