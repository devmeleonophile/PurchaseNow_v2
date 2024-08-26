import React from 'react'
import { useGetAllOrdersQuery } from '../Slices/orderApiSlices'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { Table , Button } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import { FaCheck, FaTimes } from 'react-icons/fa';


const OrderListScreen = () => {
  const{data : orders, isLoading: adminorders, error} = useGetAllOrdersQuery();
  console.log(orders);
  return (
    <>
      <h2>Order List</h2>
      {
        adminorders ? <Loader/> : error ? <Message variant='red'>No orders </Message> : (<>
            
            <Table responsive striped hover bordered className='table-sm'
            >
              <thead>
                    <tr>
                        <th>Order-Id</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th>Buttons</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order)=>{
                       return <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid ? <FaCheck style={{color : 'green'}}></FaCheck> : <FaTimes style={{color : 'red'}}></FaTimes> }</td>
                            <td>{order.isDelivered ? <FaCheck style={{color : 'green'}}></FaCheck>  :  <FaTimes style={{color : 'red'}}></FaTimes>  }</td>
                            <td>
                                <LinkContainer to={`/orders/${order._id}`}>
                                    <Button  variant='primary'>
                                       Details
                                    </Button>
                                </LinkContainer>

                            </td>
                        </tr>
                    })}
                </tbody>
                
            </Table>


        </>)
      }
    </>
  )
}

export default OrderListScreen
