import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HomepageWithAgeVerification from "./pages/HomepageWithAgeVerification";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import Store from "./pages/Store";
import Layout from "./components/Layout";
import GlobalStyle from "./styles/globalStyles";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const verified = localStorage.getItem("isVerified");
    if (verified === "true") {
      setIsVerified(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleVerify = (verified) => {
    setIsVerified(verified);
    localStorage.setItem('isVerified', verified);
  };

  const addToCart = product => {
    setCart(prevCart => {
      const newCart = [...prevCart, product];
      return newCart;
    });
  };

  const removeFromCart = productId => {
    setCart(prevCart => {
      const productIndex = prevCart.findIndex(item => item.id === productId);
      if (productIndex === -1) return prevCart; 
      
      const product = prevCart[productIndex];
      
      if (product.quantity > 1) {
        return prevCart.map((item, index) => {
          if (index === productIndex) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      }
      
      return prevCart.filter((_, index) => index !== productIndex);
    });
  };

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout cart={cart} />}>
            <Route path="/" element={<HomepageWithAgeVerification onVerify={handleVerify} />} />
            <Route path="/nosotros" element={isVerified ? <About /> : <HomepageWithAgeVerification onVerify={handleVerify} />} />
            <Route path="/mezcales" element={isVerified ? <Products /> : <HomepageWithAgeVerification onVerify={handleVerify} />} />
            <Route path="/recetas" element={isVerified ? <Recipes /> : <HomepageWithAgeVerification onVerify={handleVerify} />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/politicadeprivacidad" element={<PrivacyPolicy />} />
            <Route path="/tienda" element={isVerified ? <Store addToCart={addToCart} removeFromCart={removeFromCart} /> : <HomepageWithAgeVerification onVerify={handleVerify} />} />
            <Route path="/carrito" element={isVerified ? <Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} /> : <HomepageWithAgeVerification onVerify={handleVerify} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;