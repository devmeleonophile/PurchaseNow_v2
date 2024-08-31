import React from 'react'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { Table , Button, Row, Col, Toast } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { toast } from 'react-toastify';


import { FaCheck, FaTimes , FaEdit, FaTrash} from 'react-icons/fa';
import { useGetProductsQuery, useCreateProductsMutation } from '../Slices/productSlices';
 



const AdminProduct = () => {

    const {data: product, isLoading, isError , refetch} = useGetProductsQuery();
    
    const [data, {isLoading: productLoading, isError : productError}] = useCreateProductsMutation();

    const createProduct = async () =>{
      if (window.confirm('Do you want to create a product?')){
      try {
        const newProduct = await data().unwrap();
        refetch();
        console.log(newProduct);
        
      } catch (error) {
        toast.error('cannot able to create a product');
      }
    }
  }


    const handleDelete = (id) =>{
        console.log(id);
    }
    
  return <>
   <Row className='align-items-center my-2'>
    <Col>
       Products
    </Col>
    <Col className='text-end'>
      <Button className='btn-sm mx-3' onClick={createProduct}>
           <FaEdit/> Create Product
      </Button>
    </Col>
   </Row>
   {productLoading && <Loader/>}
   {isLoading ? <Loader/> : isError ? <Message variant='danger'>Something is wrong</Message> : (

   <Table responsive striped hover  className='table-sm'>
   <thead>
     <tr>
       <th>ID</th>
       <th>Name</th>
       <th>Brand</th>
       <th>Price</th>
       <th>Category</th>
       <th>Edit</th>



    </tr>
   </thead>
   <tbody>
    {
        product.map((item=>{
            return(
            <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.brand}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td>
                                
                                <LinkContainer to={`/admin/product/${item._id}/edit`}>
                                    <Button  variant='light' className='btn-sm mx-2'>
                                       <FaEdit/>
                                    </Button>
                                </LinkContainer>
                                <Button  variant='danger' className='btn-sm mx-2' onClick={()=>handleDelete(item._id)}>
                                       <FaTrash style={{color:'white'}}/>
                                    </Button>

                            </td>
                        </tr>
            )
        }))
    }
   </tbody>

</Table>
   )}
  


  </>
}

export default AdminProduct
