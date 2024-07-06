import { useGetProductsQuery } from '../Slices/productSlices'; 
import Products from '../Components/Products';
import { Row, Col } from 'react-bootstrap';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

 

  return (
    <div>
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Row>
            <h2>Latest Products</h2>
            {products.map((item) => (
              <Col sm={12} md={6} lg={4} xl={3} key={item._id}>
                <Products product={item} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
