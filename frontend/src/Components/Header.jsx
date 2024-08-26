import React from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import purchaseNow from '../assets/logo.png';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../Slices/userApiSlice';
import { deleteCredentials } from '../Slices/authSlice';
import {useNavigate} from 'react-router-dom'


function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);


  const dispatch = useDispatch();
  const navigate = useNavigate();
   const [logout] = useLogoutMutation();
   
   const logoutHandler = async()=>{
     try {
        await logout().unwrap();
        dispatch(deleteCredentials());
        navigate('/login');
     } catch (error) {
      console.log(error)
      
     }
   }

  const totalItems = cartItems.reduce((acc, item) => {
    const qty = Number(item.qty);
    console.log(`Acc: ${acc}, Item Qty: ${item.qty}`); // Debugging log
    return acc + qty;
  }, 0);

  console.log(cartItems)
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={purchaseNow} alt='main_logo' height="30" />
              PurchaseNow
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart />
                  {' '}Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {totalItems}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    

                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
                   
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
                {
                  userInfo && userInfo.name==='Admin' && <>
                   <NavDropdown title='Admin actions' id='admindropdown'>
                    <LinkContainer to='/admin/orderlist'>
                     <NavDropdown.Item>
                      orders
                     </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/userlist'>
                     <NavDropdown.Item>
                      Users
                     </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist'>
                     <NavDropdown.Item>
                      Products
                     </NavDropdown.Item>
                    </LinkContainer>

                   </NavDropdown>
                  </>
                }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
