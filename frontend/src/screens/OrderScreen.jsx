import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation, useUpdateDeliverMutation } from '../Slices/orderApiSlices';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const { data: paypal, isLoading: payPalLoading, error: payPalError } = useGetPayPalClientIdQuery();
    const { userInfo } = useSelector((state) => state.auth);
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const [deliverOrder , {isLoading : deliverLoading}] = useUpdateDeliverMutation();
    useEffect(() => {
      
        if (!payPalLoading && !payPalError && paypal?.clientId) {
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD', // Ensure this matches the seller's accepted currency
                    },
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            };
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPayPalScript();
                }
            }
        }
        console.log(isPending, 'paypal status')
    }, [order, paypal, paypalDispatch, payPalError, payPalLoading]);

    const testButton = async () => {
        try {
            await payOrder({ orderId, details: { payer: {} } });
            refetch();
            toast.success('Payment Successful');
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    };

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice,
                    },
                },
            ],
        }).then((orderId) => {
            return orderId;
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(async function (details) {
            try {
                await payOrder({ orderId, details });
                refetch();
                toast.success('Payment Successful');
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        });
    };

    const handleDeliver =async()=>{
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Delivered Successfully');

        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }

    const onError = (error) => {
        toast.error(error?.data?.message || error.message);
    };

    return (
        <>
            {isLoading ? <Loader /> : error ? <Message variant="danger">{error?.data?.message || error.error}</Message> : (
                <>
                    <h1>Order {order._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p><strong>Name: </strong>{order.user.name}</p>
                                    <p><strong>Email: </strong>{order.user.email}</p>
                                    <p>
                                        <strong>Address: </strong>
                                        {order.shippingAddress.address}, {order.shippingAddress.city}-
                                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered ? <Message variant="success">Delivered</Message> : <Message variant="danger">Not yet Delivered</Message>}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p><strong>Method:</strong> {order.paymentMethod}</p>
                                    {order.isPaid ? <Message variant="success">Paid</Message> : <Message variant="danger">Not yet Paid</Message>}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order.orderList.map((item) => (
                                        <ListGroup.Item key={item.product}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Item Price:</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                        <Row>
                                            <Col>Shipping Price:</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                        <Row>
                                            <Col>Tax Price:</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                        <Row>
                                            <Col>Grand Total:</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            {isPending ? <Loader /> : (
                                                <div>
                                                    {/* <Button onClick={testButton} style={{ marginBottom: '10px' }}>
                                                        Test Button
                                                    </Button> */}
                                                    <div>
                                                        <PayPalButtons
                                                            createOrder={createOrder}
                                                            onApprove={onApprove}
                                                            onError={onError}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </ListGroup.Item>
                                    )}
                                    {
                                        deliverLoading && <Loader/>
                                    }
                                    {
                                        userInfo && userInfo.name === 'Admin' && order.isPaid && !order.isDelivered && (<>
                                          <ListGroup.Item>
                                            <Button onClick={handleDeliver} variant='primary' className='btn btn-block'>
                                               Mark As Delivered
                                            </Button>
                                          </ListGroup.Item>
                                        </>)
                                    }
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default OrderScreen;
