import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Inicio from "./pages/Inicio";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import Store from "./pages/Store";
import Layout from "./components/Layout";
import GlobalStyle from "./styles/globalStyles";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/recetas" element={<Recipes />} />
            <Route path="/tienda" element={<Store />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
