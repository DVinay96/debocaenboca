import React, { createContext, useState, useContext, useEffect } from "react";

// Create the CartContext
const CartContext = createContext();

// CartProvider component to provide the cart state and functions
export const CartProvider = ({ children }) => {
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
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
