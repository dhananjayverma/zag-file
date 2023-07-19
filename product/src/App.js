import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./Components/Product";
import DetailsPage from "./Components/DetailsPage";
import CartPage from "./Components/CartPage";
import { CartProvider } from './Components/context/CartContext';

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
