import React from 'react';
import { Button, Col, Form,Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../Components/Message';
import { FaTrash } from 'react-icons/fa';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems, 'cart');
  const handleDelete =(item)=>{
    const deleteItem = item;
    cart = cartItems.filter((i)=> i._id !== item)

  }

  return (
    <Row style={{width: 'auto'}}>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {
          cartItems.length === 0 ? <Message variant='danger'>
            'No card in the item' <Link to ='/'>Go back</Link>
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
                       <Form.Control as='select' value={item.qty}>
                          {[...Array(item.countInStock).keys()].map((item)=>(
                            <option value={item+1} key={item+1}>
                                {item+1}
                            </option>
                          ))}
                      </Form.Control>
                    </Col>

                      <Col md={2}>
                        <Button onClick={() => handleDelete(item._id)}>
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
    </Row>
  );
};

export default CartScreen;
