import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Inicio from "./pages/Inicio";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import Store from "./pages/Store";
import Layout from "./components/Layout";
import GlobalStyle from "./styles/globalStyles";
import Products from "./pages/Products";
import AgeVerifyModal from "./components/AgeVerifyModal";

function App() {
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    const verified = localStorage.getItem("isVerified");
    if (verified === "true") {
      setIsVerified(true);
    }
  }, []);

  const handleVerify = (verified) => {
    setIsVerified(verified);
    localStorage.setItem('isVerified', verified)
  };

  return (
    <>
      <GlobalStyle />
      {!isVerified && <AgeVerifyModal onVerify={handleVerify}/>}
      {isVerified && (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/mezcales" element={<Products />} />
        <Route path="/recetas" element={<Recipes />} />
        <Route path="/tienda" element={<Store />} />
      </Route>
    </Routes>
  </BrowserRouter>
      )}
  
    </>
  );
}

export default App;
