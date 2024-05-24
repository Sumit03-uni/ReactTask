// src/Routes.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductsPage';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }) => {
  return sessionStorage.getItem('auth') ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const [cartCount, setCartCount] = useState(JSON.parse(localStorage.getItem('cart'))?.length || 0);

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  return (
    <Router>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductPage updateCartCount={updateCartCount} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
