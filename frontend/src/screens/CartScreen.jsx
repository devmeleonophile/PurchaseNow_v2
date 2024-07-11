import React from 'react';
import { Button, Card, Col, Form,Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../Components/Message';
import { FaTrash } from 'react-icons/fa';
import { addToCart } from '../Slices/cartSlices';
import { removeFromCart } from '../Slices/cartSlices';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems, 'cart');
  
  const cartHandler =(product, qty)=>{
    dispatch(addToCart({...product,qty}));

  }
  const handleDelete = (id) =>{
     dispatch(removeFromCart(id));
  }
  const handleCheckOut =() =>{
    navigate('/login?redirect=/shipping');
  }

  return (
    <Row style={{width: 'auto'}}>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {
          cartItems.length === 0 ? <Message>
            No item in the cart <Link to ='/'>Go back</Link>
          </Message> : <ListGroup variant='flush'>
            {
              cartItems.map((item)=> (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt='image' fluid rounded/>
                      
                      </Col>
                      <Col md={3}
                      >
                        <Link to={`/product/${item._id}`}>
                          <span>
                            {item.name}
                          </span>
                        </Link>
                      </Col>
                      <Col md={2}>
                        <span>${item.price}</span>
                      </Col>
                      <Col md={2} >
                       <Form.Control as='select' value={item.qty} onChange={(e)=> cartHandler(item, Number(e.target.value))}>
                          {[...Array(item.countInStock).keys()].map((item)=>(
                            <option value={item+1} key={item+1}>
                                {item+1}
                            </option>
                          ))}
                      </Form.Control>
                    </Col>

                      <Col md={2}>
                        <Button onClick={()=> handleDelete(item._id)}>
                          <FaTrash></FaTrash>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              )
            }
          </ListGroup>
        }  
          
      </Col>
      <Col md={4}>
       <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>SubTotal of {cartItems.length} items</h2>
          </ListGroup.Item>
          <ListGroup.Item>
             <span>Total Price : ${cartItems.reduce((acc,item)=> acc + item.qty * item.price, 0  ).toFixed(2)}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button variant='success' disabled={cartItems.le} onClick={handleCheckOut}>
               Proceed Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>

       </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
