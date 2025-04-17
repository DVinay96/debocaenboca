import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ cart, addToCart, removeFromCart }) => {
  return (
    <>
      <Header cart={cart} />
      <Outlet context={{ cart, addToCart, removeFromCart }} />
      <Footer />
    </>
  );
};

export default Layout;
