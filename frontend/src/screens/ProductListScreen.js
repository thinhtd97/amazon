import React, { useEffect } from 'react'
import { Row, Table, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProduct, productDeleteAction, productCreateAction } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import Paginate from '../components/Paginate'


const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const pageNumber = match.params.pageNumber

    const productList = useSelector(state => state.productList)
    const { products, loading, error, page, pages } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const { success: successDeleteProduct } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { success: successCreateProduct } = productCreate

    const deleteHandler = (id) => {
        dispatch(productDeleteAction(id))
    }

    const createProductHandler = () => {
        dispatch(productCreateAction())
    }

    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin) {
            history.push('/signin')
        }
        dispatch(listProduct("", pageNumber))
        
    }, [dispatch, pageNumber, userInfo, history, successDeleteProduct, successCreateProduct])

    return (
        <>
        <Row>
            <h3>Products</h3>
            <Button variant="dark" className="btn-sm ml-auto my-3" onClick={createProductHandler}> Create Product </Button>
            <Col md={12}>
                {loading ? <Loader /> : error ? <Message variant="danger"> {error} </Message> : (
                    <>
                    <Table hover responsive bordered striped className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p._id}>
                                    <td> {p._id} </td>
                                    <td> {p.name} </td>
                                    <td> {p.price} </td>
                                    <td> {p.category} </td>
                                    <td> {p.brand} </td>
                                    <td>
                                    <LinkContainer to={`/admin/product/${p._id}`}>
                                            <Button variant="light" className='btn-sm'>
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                            
                                        </LinkContainer>
                                        <Button variant="danger" className='btn-sm' onClick={() => deleteHandler(p._id)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate page={page} pages={pages} isAdmin />
                    </>
                )}
            </Col>
        </Row>
        </>
    )
}

export default ProductListScreen
