import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductsPage';
import Navbar from './components/Navbar';
import CartPage from './pages/CartsPage';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  return sessionStorage.getItem('auth') ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [cartCount, setCartCount] = useState(cart.length);


  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  
  // Change the Cart Count
  const updateCartCount = (count) => {
    setCartCount(count);
  };

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    let updatedCart;
    if(existingProductIndex >= 0){
      updatedCart = cart.map((item, index) =>
        index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [ ...cart, { ...product, quantity: 1}];
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart.length);
  };

  const updateQuantity = (index, quantity) => {
    const updatedCart = cart
      .map((item, i) => i === index ? { ...item, quantity: item.quantity + quantity } : item)
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart.length);
  };

  const handleAddToCartClick = (product) => {
    addToCart(product);
  };

  const emptyCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    updateCartCount(0);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Router>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductPage products={products} handleAddToCartClick={handleAddToCartClick} cart={cart} updateQuantity={updateQuantity} totalPrice={totalPrice} />
            </PrivateRoute>
          }
        />
        <Route path="/cart" element={
          <PrivateRoute>
            <CartPage
              cart={cart} updateQuantity={updateQuantity} emptyCart={emptyCart} totalPrice={totalPrice} />
          </PrivateRoute>
        }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
