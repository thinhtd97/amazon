import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProduct } from '../actions/productActions'
import CarouselProduct from '../components/CarouselProduct'

const HomeScreen = ({ match }) => {
    const dispatch = useDispatch()
    const keyword = match.params.keyword ? match.params.keyword : ""
    const pageNumber = match.params.pageNumber || 1
    const productList = useSelector(state => state.productList)
    const { products, loading, error, page, pages } = productList
    useEffect(() => {
        dispatch(listProduct(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])
    return (
        <>
            
            {loading ? <Loader /> : error ? <Message variant="danger"> {error} </Message> : (
                <>
                {products.length === 0 && (<Message variant="danger">Product not found</Message>)}
                {!keyword && <CarouselProduct />}
                <Row>
                    {products.map(product => (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
                <Paginate page={page} pages={pages} />
                </>
            )}
            
        </>
    )
}

export default HomeScreen
