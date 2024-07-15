import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer';
import { Form, Col, Button } from 'react-bootstrap';
import StepComponent from '../Components/stepComponent';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../Slices/cartSlices';
 

const PaymentScreen = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state)=> state.cart);
    const {shippingAddress} = cart;
    const[paymentType, setPaymentType] = useState('paypal');
    const submitHandler =(e) =>
        {
            e.preventDefault();
           dispatch(savePaymentMethod(paymentType));
           navigate('/placeorder');
        }

        useEffect(()=>{
            if(!shippingAddress.address){
                navigate('/shipping')
            }

        },[shippingAddress, navigate])
  return (

    <FormContainer>
        <StepComponent step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'> Select Payment Method</Form.Label>
                <Col>
                <Form.Check
              id='paypal'
              value='paypal'
              type='radio'
              className='my-2'
              label='PayPal or Credit Card'
              name='paymentType'
              checked={paymentType === 'paypal'}
              onChange={(e) => setPaymentType(e.target.value)}
            />
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen
