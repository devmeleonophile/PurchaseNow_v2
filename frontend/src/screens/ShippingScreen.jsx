import React, { useState } from 'react'
import FormContainer from '../Components/FormContainer'
import { Form , Button} from 'react-bootstrap';

const ShippingScreen = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const submitHandler =(e)=>{
        e.preventDefault();
    }
  return (
     <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='address'>
            <Form.Label>Address</Form.Label>
              <Form.Control
              type='addres'
              placeholder='Enter your addres'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
           ></Form.Control>
         </Form.Group>
         <Form.Group className='my-2' controlId='city'>
            <Form.Label>City</Form.Label>
              <Form.Control
              type='city'
              placeholder='Enter your City'
              value={city}
              onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
          </Form.Group>
          <Form.Group className='my-2' controlId='postalCode'>
            <Form.Label>postalCode</Form.Label>
              <Form.Control
              type='postalCode'
              placeholder='Enter your postalCode'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
           ></Form.Control>
          </Form.Group>
          <Form.Group className='my-2' controlId='country'>
            <Form.Label>Country</Form.Label>
              <Form.Control
              type='country'
              placeholder='Enter your country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
           ></Form.Control>
          </Form.Group>
        </Form>
      <Button type='submit' variant='primary'>
          Continue
        </Button>

     </FormContainer>
  )
}

export default ShippingScreen
