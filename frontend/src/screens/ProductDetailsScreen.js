import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { getProductDetails, productUpdateAction } from '../actions/productActions'
import Message from '../components/Message'
import axios from 'axios'

const ProductDetailsScreen = ({ match, history }) => {
    const productId = match.params.id
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { success: successUpdate, loading: loadingUpdate } = productUpdate

    const submitHandler = (e) => {
        e.preventDefault()
        //update product
        dispatch(productUpdateAction({ _id: product._id, name, price, brand, description, countInStock, image }))
    }

    const uploadHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            setUploading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin) {
            history.push('/signin')
        } else {
            if(!product || !product.name || product._id !== productId) {
                dispatch(getProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setCategory(product.category)
                setBrand(product.brand)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                setImage(product.image)
            }
        }
    }, [dispatch, userInfo, product, history, productId])

    return (
        <>
        {loading ? <Loader /> : error ? (<Message variant="danger"> {error} </Message>) : (
            <FormContainer>
                {loadingUpdate && (<Loader />)}
                <h3>Edit Product</h3>
                {successUpdate && (<Message> Update Product Successfully </Message>)}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="Name">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control value={name} type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="Price">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control value={price} type="number" placeholder="Enter Price" onChange={(e) => setPrice(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label>Category:</Form.Label>
                        <Form.Control value={category} type="text" placeholder="Enter Category" onChange={(e) => setCategory(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="Image">
                        <Form.Label>Image:</Form.Label>
                        <Form.Control type="text" value={image} placeholder="Image Url" onChange={(e) => setImage(e.target.value)}></Form.Control>
                        <Form.File  onChange={uploadHandler}></Form.File>
                        {uploading && (<Loader /> )}
                    </Form.Group>
                    <Form.Group controlId="Brand">
                        <Form.Label>Brand:</Form.Label>
                        <Form.Control value={brand} type="text" placeholder="Enter Brand" onChange={(e) => setBrand(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="countInStock">
                        <Form.Label>Count In Stock:</Form.Label>
                        <Form.Control value={countInStock} type="text" placeholder="Enter Count In Stock" onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="Description">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control placeholder="Enter Description" as="textarea" rows={3} value={description} name="description" onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
            </FormContainer>
        )}
            
        </>
    )
}

export default ProductDetailsScreen
