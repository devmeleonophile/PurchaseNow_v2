import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter,createRoutesFromElements,Route, RouterProvider} from 'react-router-dom'
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import {PayPalScriptProvider} from '@paypal/react-paypal-js';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import store from './store';
import LoginScreen from '../src/screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './Components/PrivateRoute.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen.jsx';
import OrderListScreen from './screens/OrderListScreen.jsx'
import {AdminRoute} from './Components/PrivateRoute.jsx'
import AdminProduct from './screens/AdminProduct.jsx';
import ProductEdit from './screens/ProductEdit.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/product/:id' element={<ProductScreen/>}/>
      <Route path='/cart' element={<CartScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>

      <Route path='' element={<PrivateRoute/>}>
        <Route path='/shipping' element={<ShippingScreen/>}/>
        <Route path='/payment' element={<PaymentScreen/>}/>
        <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
        <Route path='/orders/:id' element={<OrderScreen/>}/>
        <Route path='/profile' element={<ProfileScreen/>}/>
        
      </Route>

      <Route path='' element={<AdminRoute/>}>
        <Route path='/admin/orderlist' element={<OrderListScreen/>}/>
        <Route path='/admin/productlist' element={<AdminProduct/>}/>
        <Route path='/admin/product/:id/edit' element={<ProductEdit/>}/>
      </Route>
    </Route>
  )
)
root.render(

  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
       <RouterProvider router={router}/>
    </PayPalScriptProvider>
    </Provider>

  </React.StrictMode>
);


reportWebVitals();
