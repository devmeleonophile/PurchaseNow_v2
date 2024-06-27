import React, { useState } from 'react'
import products from '../products';
import Products from '../Components/Products';
import { Row,Col } from 'react-bootstrap';
const HomeScreen = () => {

  return (
    <div>
        <Row>
            <h2>Latest Products</h2>
        {
            products.map((item,index)=>{
                return <Col sm={12} md={6} lg={4} xl={3} key={item._id}>
                   <Products product={item}></Products>
                </Col>
            })
        }
        </Row>
      
    </div>
  )
}

export default HomeScreen
