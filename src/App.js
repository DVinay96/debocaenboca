import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Inicio from "./pages/Inicio";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import Store from "./pages/Store";
import Layout from "./components/Layout";
import GlobalStyle from "./styles/globalStyles";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Facturacion from "./pages/Facturacion";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/globalStyles";
import { CartProvider } from "./contexts/CartContext"; 
import Beers from "./pages/Beer";


function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, product];
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.id === productId);
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
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout 
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart} />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/mezcales" element={<Products />} />
            <Route path="/beers" element={<Beers />} />
            <Route path="/recetas" element={<Recipes />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/facturacion" element={<Facturacion />} />
            <Route path="/politicadeprivacidad" element={<PrivacyPolicy />} />
            <Route
              path="/tienda"
              element={
                <Store addToCart={addToCart} removeFromCart={removeFromCart} />
              }
            />
            <Route
              path="/carrito"
              element={
                <Cart
                  cart={cart}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
