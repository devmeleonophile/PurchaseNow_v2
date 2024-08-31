import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import FormContainer from '../Components/FormContainer';
import { Button, Form } from 'react-bootstrap';
import { useUpdateProductMutation, useGetProductDetailsQuery } from '../Slices/productSlices';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';
import Message from '../Components/Message';


const ProductEdit = () => {

    const navigate = useNavigate()

    const[name,setName] = useState('')
    const[price,setPrice] = useState(0)
    const[category,setCategory] = useState('')
    const[brand,setBrand] = useState('')
    const[description,setDescription] = useState('')
    const[countInStock,setcountInStock] = useState('')
    const[image,setImage] = useState('')
    const {id:productId} = useParams();

    const{data:product, isLoading, isError} = useGetProductDetailsQuery(productId);
    const[updateProduct, {isLoading:productLoading}]= useUpdateProductMutation();

    useEffect(()=>{
        setName(product?.name);
        setPrice(product?.price);
        setCategory(product?.category);
        setBrand(product?.brand);
        setcountInStock(product?.countInStock)
        setDescription(product?.description);
        setcountInStock(product?.countInStock)
        
    },[product])

    const handleEdit = async(e)=>{
        e.preventDefault()
      const updatedProduct = {
        productId,
        name,
        image,
        description,
        brand,
        category,
        price,
        countInStock

      }

     const result = await updateProduct(updatedProduct);
     if(result.error){
        toast.error(result.error)
     }else{
        toast.success('Product Updated');
        navigate('/admin/productlist')
     }

    }

  return (
    <>
    <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
    </Link>
      <FormContainer>
        <h2 className='text-center'>Edit Product</h2>
        {productLoading && <Loader/>}
        {isLoading ? <Loader/> : isError ? <Message variant='danger'>{isError}</Message> : 

        <Form onSubmit={handleEdit}>
            <Form.Group className='my-2' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control type='text' value={price} onChange={(e)=> setPrice(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control type='text' value={category} onChange={(e)=> setCategory(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control type='text' value={brand} onChange={(e)=> setBrand(e.target.value)}></Form.Control>
            </Form.Group>
            {/* <Form.Group className='my-2' controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control type='image' value={} onChange={(e)=> setName(e.target.value)}></Form.Control>
            </Form.Group> */}

            <Form.Group className='my-2' controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control type='text' value={description} onChange={(e)=> setDescription(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='countInStock'>
                <Form.Label>countInStock</Form.Label>
                <Form.Control type='number' value={countInStock} onChange={(e)=> setcountInStock(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit'>Edit Product</Button>
        </Form>
}
      </FormContainer>
    </>
  )
}

export default ProductEdit
