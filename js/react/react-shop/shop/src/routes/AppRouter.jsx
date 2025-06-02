import React from 'react'

import { Route, Routes } from "react-router";

import ProductAll from "../pages/ProductPage/ProductPage";
import Login from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ProductDetail from "../pages/ProductDetailPage/ProductDetailPage";
import CartPage from "../pages/CartPage/CartPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderCompletePage from "../pages/OrderCompletePage/OrderCompletePage";
import MyPage from "../pages/MyPage/MyPage";
import AdminProduct from "../pages/AdminProduct/AdminProduct";
import AdminOrderPage from "../pages/AdminOrderPage/AdminOrderPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductAll />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/product/:id" element={<ProductDetail />} />

      <Route element={<PrivateRoute permissionLevel="customer" />}>
        <Route path="/cart" element={<CartPage />} />

        <Route path="/payment">
          <Route index element={<PaymentPage />} />
          <Route path='success' element={<OrderCompletePage />}  />
        </Route>

        <Route path="/account/purchase" element={<MyPage />} />
      </Route>

      <Route element={<PrivateRoute permissionLevel="admin" />}>
        <Route path="/admin">
          <Route path='product' element={<AdminProduct />} />
          <Route path='order' element={<AdminOrderPage />}  />
        </Route>
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter