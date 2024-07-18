import React, { useEffect } from 'react'
import { Row,Col, ListGroup , Image, Card, Button, Toast} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import StepComponent from '../Components/stepComponent';
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { useCreateOrderMutation } from '../Slices/orderApiSlices';
import {clearCart} from '../Slices/cartSlices'
import { toast } from 'react-toastify';

const PlaceOrderScreen = () => {
  const cart = useSelector(state => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createOrder,{ isLoading, error}] = useCreateOrderMutation()
  useEffect(()=>{
     if(!cart.shippingAddress.address){
      navigate('/shipping');
     }else if(!cart.paymentMethod){
      navigate('/payment');
     }

  },[cart.shippingAddress.address, cart.paymentMethod, navigate])
  const placeOrderHandler= async()=>{

    try {
       const response = await createOrder({
        orderList : cart.cartItems,
        shippingAddress : cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemPrice,
        taxPrice: cart.taxPrice,
        shippingPrice : cart.itemShipping,
        totalPrice : cart.totalPrice

       }).unwrap();
       console.log(response,'orderscreen')

       dispatch(clearCart());
       navigate(`/orders/${response._id}`);
    } catch (error) {
        toast.error(error);
    }
  }
  return (
    <>
      <StepComponent step1 step2 step3 step4/>
       <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping Address</h2>
              <p>
                <strong>
                  Address : 
                </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}-{cart.shippingAddress.postalCode}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment Method</h3>
               {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Order Items</h4>
              
                {
                  cart.cartItems.length === 0 ? (<Message>cart is empty</Message>) : (<ListGroup variant='flush'>
                    {
                      cart.cartItems.map((item)=>{
                       return <ListGroup.Item key={item._id}>
                          <Row>
                            <Col md={1}>
                              <Image src={item.image} alt={item.name} fluid rounded></Image>
                            </Col>
                            <Col>
                              <Link to={`/product/${item._id}`}>{item.name}</Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = ${item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      })
                    }
                  </ListGroup>)
                }
             
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
             </ListGroup.Item>
             <ListGroup.Item>
              <Row>
                 <Col>Item Price :</Col>
                 <Col>${cart.itemPrice}</Col>
              </Row>
             </ListGroup.Item>
             <ListGroup.Item>
              <Row>
                 <Col>Shipping Price :</Col>
                 <Col>${cart.itemShipping}</Col>
              </Row>
             </ListGroup.Item>
             <ListGroup.Item>
              <Row>
                 <Col>Tax Price :</Col>
                 <Col>${cart.itemTax}</Col>
              </Row>
             </ListGroup.Item>
             <ListGroup.Item>
              <Row>
                 <Col>Grand Total :</Col>
                 <Col>${cart.totalPrice}</Col>
              </Row>
             </ListGroup.Item>
             <ListGroup.Item>
              <Button
               variant='primary'
               className='btn-block'
               onClick={placeOrderHandler}
               disabled={cart.cartItems.length===0}>
                Place Order
              </Button>
              {isLoading && <Loader/>}
             </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
       </Row>
    </>
  )
}

export default PlaceOrderScreen
