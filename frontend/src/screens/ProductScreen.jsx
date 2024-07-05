import { useParams, Link, useSearchParams} from 'react-router-dom'
import{Row,Col,Image, ListGroup, Card, Button} from 'react-bootstrap';
import Rating from '../Components/Rating';
import { useGetProductDetailsQuery } from '../Slices/productSlices';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
const ProductScreen = () => {
    const {id : productId} = useParams();
    const{data : product , isLoading , error} = useGetProductDetailsQuery(productId);
    
    

 return (<div>
    {isLoading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (<>
       <div>
      <Link to="/" className='btn btn-light my-3' >Go Back</Link>
      <Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={4}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h4>{product.name}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </ListGroup.Item>
                <ListGroup.Item>
                <strong> Price :</strong> ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                <strong> Description </strong> : <p>{product.description}</p>
                </ListGroup.Item>

            </ListGroup>
            
        </Col>
        <Col md={3}>
            <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                Status : <strong>{product.countInStock === 0 ? 'no stock' : 'Available' }</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                Category : <strong>{product.category}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button variant='success' disabled={product.countInStock === 0}>Add to cart</Button>
                </ListGroup.Item>

            </ListGroup>
            </Card>
            
        </Col>

      </Row>

    </div>
      
      </>)
    }

   
    </div>
  )
}

export default ProductScreen
