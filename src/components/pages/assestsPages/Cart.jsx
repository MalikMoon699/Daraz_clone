import React, { useState, useEffect } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";
import { API_Endpoints } from "../../../api/url";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${API_Endpoints}/cart`);
        if (response.ok) {
          const data = await response.json();
          setCartItems(data);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item.id] = 1;
    });
    setQuantities(initialQuantities);
  }, [cartItems]); 

  const handleIncrease = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1,
    }));
  };

  const handleDecrease = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(1, (prevQuantities[id] || 1) - 1), 
    }));
  };


  const handleCheckboxChange = (itemId) => {
    setCheckedItems((prevChecked) => {
      const newChecked = new Set(prevChecked);
      if (newChecked.has(itemId)) {
        newChecked.delete(itemId);
      } else {
        newChecked.add(itemId);
      }
      return newChecked;
    });
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setCheckedItems(new Set());
    } else {
      setCheckedItems(new Set(cartItems.map((item) => item.id)));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = async () => {
    for (const id of checkedItems) {
      try {
        await fetch(`${API_Endpoints}/cart/${id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error(`Error deleting item with ID ${id}:`, error);
      }
    }

    setCartItems((prevCart) =>
      prevCart.filter((item) => !checkedItems.has(item.id))
    );
    setCheckedItems(new Set());
    setSelectAll(false);
  };

  const handleApplyClick = () => {
    if (inputValue !== "DISCOUNT10") {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsInvalid(false);
  };

  return (
    <div className="flex" style={{ minHeight: "75vh" }}>
      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <p style={{paddingBottom:"20px",fontSize:"18px"}}>There are no items in this cart</p>
          <button className="btn-shoping" onClick={() => navigate("/")}>
            Countinue Shoping
          </button>
        </div>
      ) : (
        <div
          className="flex space-around"
          style={{
            width: "100%",
            margin: "23px 0px",
            alignItems: "start",
            flexWrap: "wrap",
          }}
        >
          <div className="flex" style={{ width: "50%" }}>
            <div>
              <div
                className="flex space-between"
                style={{
                  backgroundColor: "white",
                  padding: "2px 10px",
                  marginBottom: "25px",
                  boxShadow: "0px 1px 4px #00000033",
                }}
              >
                <div className="flex">
                  <label
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                      style={{
                        accentColor: "#f57224",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                    />
                    SELECT ALL ({checkedItems.size} ITEM(s))
                  </label>
                </div>
                <button
                  onClick={handleDeleteSelected}
                  className="flex counter"
                  style={{ backgroundColor: "transparent", cursor: "pointer" }}
                >
                  <DeleteOutlinedIcon />
                  DELETE
                </button>
              </div>
              {cartItems.map((item) => (
                <div key={item.id}>
                  <div style={{ backgroundColor: "white" }}>
                    <div
                      className="flex space-between"
                      style={{
                        position: "relative",
                        zIndex: "100",
                        padding: "8px",
                        boxShadow: "0px 1px 4px #00000033",
                      }}
                    >
                      <div className="flex">
                        <img
                          style={{ height: "12px" }}
                          src="https://img.lazcdn.com/g/tps/imgextra/i2/O1CN01m9OC6a1UK86X51Dcq_!!6000000002498-2-tps-108-54.png_2200x2200q75.png_.webp"
                        />
                        <h2 style={{ padding: "0px 10px" }}>Daraz</h2>
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex space-between"
                    style={{
                      padding: "16px 10px",
                      background: "white",
                      marginBottom: "20px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems.has(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                      style={{
                        accentColor: "#f57224",
                        color: "white",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                    />
                    <img
                      style={{
                        height: "80px",
                        width: "80px",
                        objectFit: "cover",
                      }}
                      src={item.img}
                      alt={item.name}
                    />
                    <h4
                      style={{
                        width: "40%",
                        color: "#212121",
                        fontSize: "16px",
                        fontWeight: "400",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        padding: "4px 17px",
                      }}
                    >
                      {item.name}
                    </h4>
                    <div>
                      <h5 style={{ fontSize: "30px" }}>Rs. {item.price}</h5>
                      <div className="flex" style={{ justifyContent: "start" }}>
                        <h4
                          style={{
                            textDecoration: "line-through",
                            fontSize: "15px",
                            color: "#747474",
                          }}
                        >
                          Rs.
                          {Math.round(
                            (typeof item.price === "string"
                              ? parseInt(item.price.replace(/,/g, ""), 10)
                              : item.price) * 1.13
                          )}
                        </h4>
                        <h4 style={{ padding: "0px 10px" }}>-13%</h4>
                      </div>
                    </div>

                    <div>
                      <div className="flex quantityCounter">
                        <button
                          onClick={() => handleDecrease(item.id)}
                          className="counter"
                          disabled={quantities[item.id] === 1}
                          style={{
                            cursor:
                              quantities[item.id] === 1
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          -
                        </button>
                        <h1 style={{ padding: "4px 16px" }}>
                          {quantities[item.id] || 1}
                        </h1>
                        <button
                          className="counter"
                          onClick={() => handleIncrease(item.id)}
                          style={{ cursor: "pointer" }}
                        >
                          +
                        </button>
                      </div>
                      <h2>
                        Total : Rs.
                        {quantities[item.id] *
                          (parseInt(String(item.price).replace(/,/g, ""), 10) ||
                            0)}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              padding: "0px 15px",
              backgroundColor: "white",
              borderRadius: "4px",
              boxShadow: "1px 1px 3px #00000057",
            }}
          >
            <p style={{ padding: "20px 8px 2px" }}>Location</p>
            <div
              style={{
                padding: "13px 16px",
                borderBottom: "0.5px solid #0000003b",
              }}
              className="flex space-between"
            >
              <div className="flex">
                <LocationOnOutlinedIcon />
                <h2
                  style={{
                    maxWidth: "176px",
                    wordBreak: "break-word",
                    padding: "4px 4px 5px 5px",
                  }}
                >
                  Add Shipping Address
                </h2>
              </div>
            </div>
            <h3 style={{ padding: "7px 6px" }}>Order Summary</h3>
            <div style={{ padding: "0px 6px" }} className="flex space-between">
              <p style={{ padding: "12px 5px" }}>Subtotal (0 items)</p>
              <h2>Rs. 0</h2>
            </div>
            <div style={{ padding: "0px 6px" }} className="flex space-between">
              <p style={{ padding: "12px 5px" }}>Subtotal (0 items)</p>
              <h2>Rs. 0</h2>
            </div>
            <div
              className="flex space-between"
              style={{ alignItems: "start", padding: "3px 10px" }}
            >
              <div>
                <input
                  style={{
                    border: "0.5px solid black",
                    borderRadius: "0",
                    outline: "0",
                    padding: "5px",
                    width: "230px",
                    margin: "0px 13px 0px 0px",
                  }}
                  type="text"
                  placeholder="Enter Voucher Code"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <h1
                  style={{
                    color: "red",
                    display: isInvalid ? "block" : "none",
                  }}
                >
                  Sorry, this voucher is not valid.
                </h1>
              </div>
              <button
                style={{
                  border: "none",
                  padding: "5px 14px",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
                className="buy-btn"
                onClick={handleApplyClick}
              >
                Apply
              </button>
            </div>
            <div style={{ padding: "1px 10px" }} className="flex space-between">
              <h2 style={{ padding: "18px 3px 6px 3px", fontSize: "18px" }}>
                Subtotal (0 items)
              </h2>
              <h5>Rs. 0</h5>
            </div>
            <div className="flex">
              <button
                style={{
                  border: "none",
                  borderRadius: "4px",
                  margin: "9px 13px",
                  padding: "12px 18px",
                  cursor: "pointer",
                }}
                className="cart-btn"
                onClick={() => navigate("/")}
              >
                PROCEED TO CHECKOUT(0)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
