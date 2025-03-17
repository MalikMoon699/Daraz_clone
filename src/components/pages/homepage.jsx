import React from "react";
import AutoSlider from "./assestsPages/autoSlider";
import CustomCards from "../pages/assestsPages/CustomCards";
import SellCards from "../pages/assestsPages/SellCards";

const Homepage = () => {

  return (
    <>
      <AutoSlider />
      <div className="flex" style={{ padding: "20px 0px" }}>
        <div style={{ width: "83%" }}>
          <h4>Flash Sale</h4>
          <div style={{ background: "white", padding: "0px 0px 8px 0px" }}>
            <div
              className="flex"
              style={{
                justifyContent: "space-between",
                borderBottom: "1px solid #00000040",
                padding: "17px 12px 7px 12px",
              }}
            >
              <h5>On Sale Now</h5>
              <button
                className="btn-1"
              >
                Shop All Products
              </button>
            </div>
            <CustomCards />
          </div>
        </div>
      </div>
      <div className="flex" style={{ padding: "20px 0px" }}>
        <div style={{ width: "83%" }}>
          <h4 style={{ color: "#424242", fontSize: "22px" }}>Just For You</h4>
          <SellCards />
        </div>
      </div>
    </>
  );
};

export default Homepage;
