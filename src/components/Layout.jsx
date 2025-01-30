import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Layout = ({cart}) => {
  return (
    <>
      <Header cart={cart} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
