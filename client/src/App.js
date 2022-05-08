import React from "react";
import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from "./components/routes/ProtectedRoute";
import AdminRoute from "./components/routes/AdminRoute";

import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from './components/layout/Header'
import ProductDetails from "./components/product/ProductDetails";

import Login from "./components/user/Login";
import Register from "./components/user/Register";

import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

import Cart from './components/cart/Cart'
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import OrdersList from './components/order/OrdersList'
import OrderDetails from "./components/order/OrderDetails";

import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import AllOrdersList from "./components/admin/AllOrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from './components/admin/UsersList'
import UpdateUser from './components/admin/UpdateUser'
import ProductReviews from "./components/admin/ProductReviews";

const App = ({ stripeApiKey, isAdmin }) => {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search/:keyword' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<NewPassword />} />
        <Route path='/cart' element={<Cart />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/me' element={<Profile />} />
          <Route path='/me/update' element={<UpdateProfile />} />
          <Route path='/password/update' element={<UpdatePassword />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/order/confirm' element={<ConfirmOrder />} />
          {stripeApiKey &&
            <Route path='payment' element={<Payment stripeApiKey={stripeApiKey} />} />
          }
          <Route path='/success' element={<OrderSuccess />} />
          <Route path='/orders/me' element={<OrdersList />} />
          <Route path='/order/:id' element={<OrderDetails />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/admin/products' element={<ProductsList />} />
          <Route path='/admin/product' element={<NewProduct />} />
          <Route path='/admin/product/:id' element={<UpdateProduct />} />
          <Route path='/admin/orders' element={<AllOrdersList />} />
          <Route path='/admin/order/:id' element={<ProcessOrder />} />
          <Route path='/admin/users' element={<UsersList />} />
          <Route path='/admin/user/:id' element={<UpdateUser />} />
          <Route path='/admin/reviews' element={<ProductReviews />} />
        </Route>
      </Routes>
      {isAdmin ?
        null
        :
        <Footer />
      }
    </>
  );
}

export default App;
