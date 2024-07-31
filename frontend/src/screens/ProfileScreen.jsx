import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateProfileMutation } from '../Slices/userApiSlice';
import { setCredentials } from '../Slices/authSlice.js';
import { useGetMyOrdersQuery } from '../Slices/orderApiSlices.js';
import { FaCheck, FaTimes } from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../Components/Message.jsx'


const ProfileScreen = () => {

    const {userInfo}= useSelector((state)=> state.auth)
    const dispatch = useDispatch();
    const[name, setUserName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("")
    const[confirmPassword, setconfirmPassword] = useState("");
    const[updateProfile, {isLoading : updateProfileLoading}] = useUpdateProfileMutation();
    const {data : orders} = useGetMyOrdersQuery();



    const profileHandler = async(e)=>{
       e.preventDefault();
       if(password !== confirmPassword){
        toast.error('passwords do not match');
       }else{
            try {
              const res = await updateProfile({
                _id : userInfo._id,
                name,
                email,
                password
               }).unwrap();
               
               dispatch(setCredentials({ ...res, }));
               toast.success('Profile updated successfully');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
       }
       
    }
   
    useEffect(()=>{
        console.log(orders, 'orders')
        setUserName(userInfo.name);
        setEmail(userInfo.email);

    },[userInfo, userInfo.name, userInfo.email])
  return (
    <Row>
        <Col md={4}>
            <h2>Update Profile</h2>
            <Form onSubmit={profileHandler}>
               <Form.Group className='my-2'>
                <Form.Label>
                    User Name
                </Form.Label>
                <Form.Control id='username' type='text' value={name} onChange={(e)=>setUserName(e.target.value)}>

                </Form.Control>
               </Form.Group>
               <Form.Group className='my-2'>
                <Form.Label>
                    User Email
                </Form.Label>
                <Form.Control id='email' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}>

                </Form.Control>
               </Form.Group>
               <Form.Group className='my-2'>
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control id='password' type='password' value={password} placeholder='Enter the password' onChange={(e)=>setPassword(e.target.value)}>

                </Form.Control>
               </Form.Group>
               <Form.Group className='my-2'>
                <Form.Label>
                    Confirm Password
                </Form.Label>
                <Form.Control id='Confirm password' type='password' value={confirmPassword} placeholder='Confirm password' onChange={(e)=>setconfirmPassword(e.target.value)}>

                </Form.Control>
               </Form.Group>
               <Button type='submit'>Update</Button>
            </Form>

        </Col>
        <Col md={8}>
            <h2>My Orders</h2>
            {orders?.length > 0 ? 
            <Table responsive hover striped className='table-sm'>
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
            : <Message variant='red'>No orders</Message> }
        </Col>
    </Row> 
   
  )
}

export default ProfileScreen
