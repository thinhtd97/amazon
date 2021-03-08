import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Col, Form } from 'react-bootstrap'
import CheckOutSteps from '../components/CheckOutSteps'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('Paypal')
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

   

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Select Method: </Form.Label>
                </Form.Group>
                <Col>
                    <Form.Check type="radio" name="paymentMethod" value="Paypal" checked label="Paypal and credit Card" id="Paypal" onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                    <Form.Check type="radio" name="paymentMethod" label="Stripe" value="Stripe" id="Stripe" onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                </Col>
                <Button type="submit" className="my-3">
                    continue
                </Button>
            </Form>   
        </FormContainer>
    )
}

export default PaymentScreen
