import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomCards = () => {
  const navigate = useNavigate();
  const generateId = () => Math.floor(Math.random() * 100000);
  const [cartData, setCartData] = useState([]);

useEffect(() => {
  const storedData = JSON.parse(localStorage.getItem("cartData"));

  if (storedData) {
    setCartData(
      storedData.map((item) => ({ ...item, price: Number(item.price) }))
    );
  } else {
    const newData = [
      {
        id: generateId(),
        img: "https://img.drz.lazcdn.com/static/pk/p/c6d1351d5dc1659e75fa8f1e89388c5c.jpg_400x400q80.jpg",
        name: "Youngs Mayonnaise 200 ml",
        price: 148,
      },
      {
        id: generateId(),
        img: "https://img.drz.lazcdn.com/static/pk/p/0a3c665c603c07c50d1d2d754def7581.jpg_400x400q80.jpg",
        name: "T10 Ultra Smartwatch 2.09inch HD Big Screen Magnetic Wireless Charging Watch",
        price: 1289,
      },
      {
        id: generateId(),
        img: "https://img.drz.lazcdn.com/static/pk/p/6fffa030c7af6e8e75124aa983520eef.jpg_400x400q80.jpg",
        name: "Samsung Galaxy A06 4GB RAM + 128 GB ROM",
        price: 26099,
      },
      {
        id: generateId(),
        img: "https://img.drz.lazcdn.com/static/pk/p/90060f0cd6306a23e6725cbcedae835b.jpg_400x400q80.jpg",
        name: "Lemon Max Dishwash Long Bar 265g",
        price: 70,
      },
      {
        id: generateId(),
        img: "https://img.drz.lazcdn.com/static/pk/p/055087eadb81dbde5eaf95e4dbb7201d.jpg_400x400q80.jpg",
        name: "Ear Wax Cleaning Kit, 6 Pcs Ear Pick Tools",
        price: 110,
      },
    ];

    localStorage.setItem("cartData", JSON.stringify(newData));
    setCartData(newData);
  }
}, []);


  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="flex" style={{ justifyContent: "space-between",overflow:"auto" }}>
      {cartData.map((item) => (
        <div
          className="card"
          key={item.id}
          onClick={() => handleProductClick(item)}
          style={{ cursor: "pointer", backgroundColor: "white" }}
        >
          <img
            src={item.img}
            style={{ width: "195px", height: "188px", objectFit: "cover" }}
          />
          <h4>{item.name}</h4>
          <h5>Rs. {item.price}</h5>
          <div
            className="flex"
            style={{ justifyContent: "start", paddingLeft: "4px" }}
          >
            <p style={{ textDecoration: "line-through", fontSize: "12px" }}>
              Rs. {Math.round(Number(item.price) * 0.75)}
            </p>

            <h1 style={{ padding: "6px", paddingLeft: "0px" }}>-25%</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomCards;
