// client/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App.jsx';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen'; // <--- Import
import UserListScreen from './screens/admin/UserListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/shipping' element={<ShippingScreen />} />
      <Route path='/payment' element={<PaymentScreen />} />
      <Route path='/placeorder' element={<PlaceOrderScreen />} />
      <Route path='/order/:id' element={<OrderScreen />} /> {/* <--- New Route */}
      
      {/* Admin Routes */}
      <Route path='/admin/userlist' element={<UserListScreen />} />
      <Route path='/admin/productlist' element={<ProductListScreen />} />
      <Route path='/admin/products/:id/edit' element={<ProductEditScreen />} />
      <Route path='/admin/orderlist' element={<OrderListScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);