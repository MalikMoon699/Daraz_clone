import React from "react";
import Navbar from "../navbarFooter/navbar";
import Footer from "../navbarFooter/footer";
import Pages from "../pages/homepage";
import { Route, Routes } from "react-router-dom"; 
import ProductDetails from "../pages/assestsPages/detailsPages/ProductDetails";
import Cart from "../pages/assestsPages/Cart";
import SellProduct from "../pages/assestsPages/sellProduct/SellProduct";
import FooterNav from "../navbarFooter/footerNav";

const Main = () => {
  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <Navbar />
        <Routes>
          <Route path="/" element={<Pages />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sellProduct" element={<SellProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      <Footer />
      {/* <FooterNav /> */}
    </div>
  );
};

export default Main;