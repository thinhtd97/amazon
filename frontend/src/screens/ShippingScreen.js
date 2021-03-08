import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps'

const ShippingScreen = ({ history }) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [postalCode, setPostalCode] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, country, postalCode}))
        history.push('/payment')
    }

    useEffect(() => {
        if(shippingAddress) {
            setAddress(shippingAddress.address)
            setCity(shippingAddress.city)
            setCountry(shippingAddress.country)
            setPostalCode(shippingAddress.postalCode)
        }
    }, [shippingAddress])

    return (
        <>
            <CheckOutSteps step1 step2 />
            <FormContainer>
                <h3>Shipping</h3>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="Address">
                        <Form.Label>Address:</Form.Label>
                        <Form.Control type="text" required value={address} placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="City">
                        <Form.Label>City:</Form.Label>
                        <Form.Control type="text" required value={city} placeholder="Enter City" onChange={(e) => setCity(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="Country">
                        <Form.Label>Country:</Form.Label>
                        <Form.Control type="text" required value={country} placeholder="Enter Country" onChange={(e) => setCountry(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="ConfirmPassword">
                        <Form.Label>Postal Code:</Form.Label>
                        <Form.Control type="text" required value={postalCode} placeholder="Enter Postal Code" onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">continue</Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default ShippingScreen
