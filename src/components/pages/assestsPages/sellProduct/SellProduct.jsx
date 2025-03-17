import React, { useEffect, useRef, useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { Modal } from "@mui/material";

const SellProduct = () => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDiscount, setProductDiscount] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [messageModal, setMessageModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

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

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    if (error) setError("");
  };

  const handleSellProduct = async () => {
    if (!productName || !productPrice || !productDiscount || !imagePreview) {
      setError("Please fill all fields and add an image.");
      return;
    }

    const productData = {
      img: imagePreview,
      name: productName,
      price: productPrice,
      discount: productDiscount,
    };

    try {
      let response;
      if (editProductId) {
        response = await fetch(`http://localhost:5003/sell/${editProductId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
      } else {
        response = await fetch("http://localhost:5003/sell", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...productData,
            id: Math.random().toString(36).substr(2, 4),
          }),
        });
      }

      if (response.ok) {
        setMessage(
          editProductId ? "Product updated!" : "Product added successfully!"
        );
        setMessageModal(true);
        resetForm();
        fetchProducts();
      } else {
        setMessage("Failed to save product.");
        setMessageModal(true);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      setMessage("Error saving product.");
      setMessageModal(true);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5003/sell/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMessage("Product deleted!");
        setMessageModal(true);
        fetchProducts();
      } else {
        setMessage("Failed to delete product.");
        setMessageModal(true);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setProductName(product.name);
    setProductPrice(product.price);
    setProductDiscount(product.discount);
    setImagePreview(product.img);
    setEditProductId(product.id);
  };

  const resetForm = () => {
    setProductName("");
    setProductPrice("");
    setProductDiscount("");
    setImagePreview(null);
    setEditProductId(null);
  };

  const messageModalClose = () => {
    setMessageModal(false);
  };

  return (
    <div className="flex" style={{ maxHeight: "100vh", alignItems: "normal",justifyContent:"flex-start" }}>
      <Modal
        className="flex"
        open={messageModal}
        onClose={() => setMessageModal(false)}
      >
        <div
          style={{ backgroundColor: "white", height: "15%", width: "17%",textAlign:"center",padding:"6px",borderRadius:"6px" }}>
          <h1 style={{fontSize:"20px"}}>{message}</h1>
          <button
            className="cart-btn"
            style={{
              border: "none",
              borderRadius: "4px",
              margin: "9px 13px",
              padding: "9px 34px",
              cursor: "pointer",
            }}
            onClick={messageModalClose}
          >
            Ok
          </button>
        </div>
      </Modal>
      <div
        className="flex sellerInputs"
        style={{
          background: "white",
          boxShadow: "0px 1px 5px #00000078",
          flexDirection: "column",
        }}
      >
        <h1>{editProductId ? "Edit Product" : "Sell your product"}</h1>
        {error && <h2 style={{ color: "red" }}>{error}</h2>}

        <input
          type="text"
          placeholder="Product name"
          value={productName}
          onChange={handleInputChange(setProductName)}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={handleInputChange(setProductPrice)}
        />
        <input
          type="number"
          placeholder="Product Discount"
          value={productDiscount}
          onChange={handleInputChange(setProductDiscount)}
        />

        <div
          className="flex space-between"
          style={{
            width: "300px",
            padding: "7px 11px",
            background: "#e5e5e5",
            borderRadius: "5px",
          }}
        >
          <h2 style={{ padding: "0px" }}>Add Product Image</h2>
          <button
            className="color"
            style={{
              cursor: "pointer",
              background: "transparent",
              color: "#2abbe8",
              border: "none",
            }}
            onClick={handleButtonClick}
          >
            <ImageIcon />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {imagePreview && (
          <div style={{ marginTop: "10px" }}>
            <h3>Image Preview:</h3>
            <img
              src={imagePreview}
              alt="Selected Product"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          </div>
        )}

        <div className="flex">
          <button
            style={{
              border: "none",
              borderRadius: "4px",
              margin: "9px 13px",
              padding: "9px 34px",
              cursor: "pointer",
            }}
            onClick={handleSellProduct}
            className="cart-btn"
          >
            {editProductId ? "Update Product" : "Sell"}
          </button>
        </div>
        {editProductId && (
          <button
            className="btn-2 buy-btn"
            onClick={resetForm}
            style={{
              marginLeft: "10px",
              padding: "9px 45px",
              borderRadius: "4px",
            }}
          >
            Cancel Edit
          </button>
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>Your Selling Products</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            height: "90vh",
            overflow: "auto",
            padding: "20px",
          }}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <div
                className="card"
                key={product.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                  maxHeight: "310px",
                  minHeight: "310px",
                }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <h4>{product.name}</h4>
                <div
                  className="flex"
                  style={{ justifyContent: "left", paddingLeft: "4px" }}
                >
                  <p
                    style={{
                      textDecoration: "line-through",
                      fontSize: "12px",
                      color: "#747474",
                    }}
                  >
                    Price: {product.price}
                  </p>
                  <h1 style={{ padding: " 6px 6px 6px 0px" }}>
                    Discount: {product.discount}%
                  </h1>
                </div>
                <h5>
                  Sell Price: 
                  {Math.round(product.price * (1 - product.discount / 100))}
                </h5>

                <div>
                  <button
                    className="btn-2 buy-btn"
                    style={{ padding: "6px 21px", marginTop: "10px" }}
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-2 cart-btn"
                    onClick={() => handleDeleteProduct(product.id)}
                    style={{ padding: "6px 21px", marginTop: "10px" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellProduct;
