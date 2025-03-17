import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SellCards = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5003/sell");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div
      className="flex"
      style={{ justifyContent: "left", flexWrap: "wrap", gap: "15px" }}
    >
      {products.length > 0 ? (
        products.map((item) => {
          const originalPrice =
            typeof item.price === "string"
              ? parseInt(item.price.replace(/,/g, ""), 10)
              : item.price;

          const discountedPrice = Math.round(
            originalPrice * (1 - item.discount / 100)
          );

          return (
            <div
              className="card sellCard"
              key={item.id}
              onClick={() => handleProductClick(item)}
              style={{
                cursor: "pointer",
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "1px 1px 5px rgba(0, 0, 0, 0)",
                width: "180px",
                maxHeight: "310px",
                minHeight: "310px",
              }}
            >
              <img
                src={item.img}
                alt={item.name}
                style={{
                  width: "163px",
                  height: "192px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
              <h4>{item.name}</h4>
              <h5>Rs. {discountedPrice}</h5>
              <div className="flex" style={{justifyContent:"left" , paddingLeft:"4px"}}>
                <p
                  style={{
                    textDecoration: "line-through",
                    fontSize: "12px",
                    color: "#747474",
                  }}
                >
                  Rs. {item.price}
                </p>
                <h1 style={{ padding: "6px 6px 6px 0px" }}>
                  {item.discount}% OFF
                </h1>
              </div>
            </div>
          );
        })
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default SellCards;
