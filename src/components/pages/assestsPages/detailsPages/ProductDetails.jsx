import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import RemoveModeratorOutlinedIcon from "@mui/icons-material/RemoveModeratorOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import OrderPlace from "../submit/OrderSubmit";
import CartSubmit from "../submit/CartSubmit";
import { Modal } from "@mui/material";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product || {};
  const [quantity, setQuantity] = React.useState(1);
  const [order, setOrder] = useState(false);
  const [cart, setCart] = useState(false);

const discountedPrice = Math.round(
  (typeof product.price === "string"
    ? parseInt(product.price.replace(/,/g, ""), 10)
    : product.price) *
    (1 - (product.discount || 13) / 100)
);

  const handlOrderSubmit = () => {
    setOrder(true);
    setTimeout(() => setOrder(false), 3000);
  };
  const handlCartSubmitanimation = () => {
    setCart(true);
    setTimeout(() => setCart(false), 2500);
  };

  const handlCartSubmit = async () => {
    const productData = {
      img: product.img,
      name: product.name,
      price: product.price,
    };

    try {
      const response = await fetch("http://localhost:5003/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        console.log("Product added to cart successfully");
      } else {
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <>
      <Modal className="flex" open={order} onClose={() => setOrder(false)}>
        <div>
          <OrderPlace />
        </div>
      </Modal>
      <Modal className="flex" open={cart} onClose={() => setCart(false)}>
        <div>
          <CartSubmit />
        </div>
      </Modal>

      <div className="flex" style={{ minHeight: "100vh" }}>
        <div></div>
        <div
          className="flex"
          style={{
            margin: "40px",
            backgroundColor: "white",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px 0px",
            }}
          >
            <img
              style={{
                height: "330px",
                boxShadow: "1px 1px 3px #0000004f",
                width: "330px",
                objectFit: "cover",
              }}
              src={product.img || "https://via.placeholder.com/330"}
              alt={product.name}
            />
            <img
              style={{
                height: "52px",
                width: "52px",
                margin: "15px",
                border: "1px solid #f57224",
                objectFit: "cover",
              }}
              src={product.img || "https://via.placeholder.com/330"}
              alt={product.name}
            />
          </div>
          <div style={{ padding: "10px 20px" }}>
            <img
              style={{ height: "16px" }}
              src="https://img.drz.lazcdn.com/g/tps/imgextra/i1/O1CN01cLS4Rj1vgZ8xaij1e_!!6000000006202-2-tps-64-32.png"
            />
            <h4
              style={{
                color: "#212121",
                fontSize: "22px",
                fontWeight: "400",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {product.name || "Product Name Not Available"}
            </h4>
            <div>
              <div
                style={{ padding: "25px 2px" }}
                className="flex space-between"
              >
                <div className="flex starImg">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABFUExURfakAPelAPakAPekAPakAPelAPalAEdwTP+vAPiuAPakAPqoAPalAPalAPelAP/WAP/TAP/MAP/PAP/bAPq1APy/AP7HAGxqCN8AAAAPdFJOU/5Lu2byeuMADP2nIMmTOjbD1MQAAAD7SURBVCjPhdNbkoMgEAXQq4KhAZWn+1/qAFFjk5TTH1pwuIoIeD0WeFPJR5ZCPbASkA8sQTzOWM3keBw8HGJicfBwjIHF7zzBx8jj6MJxY/HGZpiWcQb8VjwShNVyWlXjpfSXopT3rZXLKVHtErPBS1kk77a+wg5M9eFqRP7SzVHR9u7qrqtAGM6pffuhx4c1D8GFAuUeTr2+WyOHqzyJoVsWkW58rczJ6p4OWDpekf2nyHY8YW/wvibR8YLanQmpDkgwnEfye8FZowzYM7qZi1SxLKNpA86pH2zqD5LvfbCOpaEZDxDLZ5OsFpax1Ibt6GH+eUr+OWN9/QE2YB+QdE4J4wAAAABJRU5ErkJggg==" />
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABFUExURfakAPelAPakAPekAPakAPelAPalAEdwTP+vAPiuAPakAPqoAPalAPalAPelAP/WAP/TAP/MAP/PAP/bAPq1APy/AP7HAGxqCN8AAAAPdFJOU/5Lu2byeuMADP2nIMmTOjbD1MQAAAD7SURBVCjPhdNbkoMgEAXQq4KhAZWn+1/qAFFjk5TTH1pwuIoIeD0WeFPJR5ZCPbASkA8sQTzOWM3keBw8HGJicfBwjIHF7zzBx8jj6MJxY/HGZpiWcQb8VjwShNVyWlXjpfSXopT3rZXLKVHtErPBS1kk77a+wg5M9eFqRP7SzVHR9u7qrqtAGM6pffuhx4c1D8GFAuUeTr2+WyOHqzyJoVsWkW58rczJ6p4OWDpekf2nyHY8YW/wvibR8YLanQmpDkgwnEfye8FZowzYM7qZi1SxLKNpA86pH2zqD5LvfbCOpaEZDxDLZ5OsFpax1Ibt6GH+eUr+OWN9/QE2YB+QdE4J4wAAAABJRU5ErkJggg==" />
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABFUExURfakAPelAPakAPekAPakAPelAPalAEdwTP+vAPiuAPakAPqoAPalAPalAPelAP/WAP/TAP/MAP/PAP/bAPq1APy/AP7HAGxqCN8AAAAPdFJOU/5Lu2byeuMADP2nIMmTOjbD1MQAAAD7SURBVCjPhdNbkoMgEAXQq4KhAZWn+1/qAFFjk5TTH1pwuIoIeD0WeFPJR5ZCPbASkA8sQTzOWM3keBw8HGJicfBwjIHF7zzBx8jj6MJxY/HGZpiWcQb8VjwShNVyWlXjpfSXopT3rZXLKVHtErPBS1kk77a+wg5M9eFqRP7SzVHR9u7qrqtAGM6pffuhx4c1D8GFAuUeTr2+WyOHqzyJoVsWkW58rczJ6p4OWDpekf2nyHY8YW/wvibR8YLanQmpDkgwnEfye8FZowzYM7qZi1SxLKNpA86pH2zqD5LvfbCOpaEZDxDLZ5OsFpax1Ibt6GH+eUr+OWN9/QE2YB+QdE4J4wAAAABJRU5ErkJggg==" />
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABFUExURfakAPelAPakAPekAPakAPelAPalAEdwTP+vAPiuAPakAPqoAPalAPalAPelAP/WAP/TAP/MAP/PAP/bAPq1APy/AP7HAGxqCN8AAAAPdFJOU/5Lu2byeuMADP2nIMmTOjbD1MQAAAD7SURBVCjPhdNbkoMgEAXQq4KhAZWn+1/qAFFjk5TTH1pwuIoIeD0WeFPJR5ZCPbASkA8sQTzOWM3keBw8HGJicfBwjIHF7zzBx8jj6MJxY/HGZpiWcQb8VjwShNVyWlXjpfSXopT3rZXLKVHtErPBS1kk77a+wg5M9eFqRP7SzVHR9u7qrqtAGM6pffuhx4c1D8GFAuUeTr2+WyOHqzyJoVsWkW58rczJ6p4OWDpekf2nyHY8YW/wvibR8YLanQmpDkgwnEfye8FZowzYM7qZi1SxLKNpA86pH2zqD5LvfbCOpaEZDxDLZ5OsFpax1Ibt6GH+eUr+OWN9/QE2YB+QdE4J4wAAAABJRU5ErkJggg==" />
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABUUExURUdwTPepAP2yAPitAPemAPeqAPakAPakAP+yAP+9APeqAPmrAPelAPeoAPiqAPelAPepAPenAPakAP/OAP/UAP/RAP/aAP/XAP/eAPmyAPzAAP/KAIFqyggAAAASdFJOUwBtHPN76srzDwm/MUndqVqckA5DiAwAAAD9SURBVCjPnZKLroQgDETxgSj4HEEF//8/t0CMindN7k5MMD0ZHNsy9h/V2SsuRf1CG4HyBU+wL/ZGWP1iL2G273Yyb9t3e0bmbbO8+dvMi4VkHnaVjbITwOzxUkBUfTmomEEW8LLW7YEuJptk50uiUozlBeyu10PLuoQv5YPA4N+Iu/WqmERGSnPgxPWq6Vn9GWrVQSPXpwIV7WWOJzfapNT/M5w59KDEYU+cPzqTw82HGOPjo99XLKsE99ij5p3wJBLcBex8B3d/V37HnMrOousheM0UkuSwBHnWMNXTkUZXfkBl3AMl0WFMtgzjuWNthXv0Xt6ztHfcsJ/0AWxHFobg9zY6AAAAAElFTkSuQmCC" />
                  <h2 style={{ color: "#136cff" }}>Ratings 422</h2>
                </div>
                <div className="flex">
                  <ShareIcon
                    style={{ cursor: "pointer", margin: "0px 10px" }}
                  />
                  <FavoriteBorderOutlinedIcon style={{ cursor: "pointer" }} />
                </div>
              </div>
            </div>
            <div
              style={{
                paddingBottom: "15px",
                borderBottom: "1px solid #eff0f5",
                lineHeight: "20px",
              }}
              className="flex"
            >
              <h1 style={{ color: "#9e9e9e", fontSize: "12px" }}>Brand:</h1>
              <h2
                className="text-blue"
                style={{ borderRight: "1px solid #9e9e9e" }}
              >
                Young's Food
              </h2>
              <h2 className="text-blue">
                More Baking & Cooking from Young's Food
              </h2>
            </div>
            <div
              style={{
                padding: "16px 0 17px",
                borderBottom: "1px solid #eff0f5",
              }}
            >
              <h5 style={{ fontSize: "30px" }}>Rs. {discountedPrice}</h5>
              <div className="flex" style={{ justifyContent: "start" }}>
                <h4
                  style={{
                    textDecoration: "line-through",
                    fontSize: "15px",
                    color: "#747474",
                  }}
                >
                  Rs. {product.price}
                </h4>

                <h4 style={{ padding: "0px 10px" }}>
                  -{product.discount || "13"}%
                </h4>
              </div>
            </div>
            <div
              className="flex"
              style={{ justifyContent: "start", padding: "24px 8px 10px 0px" }}
            >
              <h2>Quantity:</h2>
              <div className="flex quantityCounter">
                <button
                  className="counter"
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity === 1}
                  style={{ cursor: quantity === 1 ? "not-allowed" : "pointer" }}
                >
                  -
                </button>
                <h1 style={{ padding: "4px 16px" }}>{quantity}</h1>
                <button
                  className="counter"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ cursor: "pointer" }}
                >
                  +
                </button>
              </div>
            </div>
            <div style={{ paddingBottom: "15px" }}>
              <h2>Total : Rs. {quantity * discountedPrice}</h2>
            </div>
            <div>
              <button className="btn-2 buy-btn" onClick={handlOrderSubmit}>
                Buy Now
              </button>
              <button
                className="btn-2 cart-btn"
                onClick={() => {
                  handlCartSubmitanimation();
                  handlCartSubmit();
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div>
            <div
              style={{
                marginBottom: "10px",
                padding: "0px 20px",
                backgroundColor: "#00000012",
                borderRadius: "0px 0px 0px 8px",
              }}
            >
              <h1 style={{ padding: "20px 16px 2px" }}>Delivery Options </h1>
              <div
                style={{
                  padding: "8px 2px",
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
                    Sindh, Karachi - Gulshan-e-Iqbal, Block 15
                  </h2>
                </div>
                <button className="link-btn">CHANGE</button>
              </div>
              <div className="flex space-between">
                <div className="flex">
                  <LocalShippingOutlinedIcon />
                  <div style={{ padding: "6px 5px" }}>
                    <h2 style={{ padding: "0px 4px" }}>Standard Delivery</h2>
                    <p style={{ padding: "1px 5px", fontSize: "12px" }}>
                      Get by 13-16 Mar
                    </p>
                  </div>
                </div>
                <h2>Rs. 135</h2>
              </div>
              <div
                style={{ padding: "8px 4px" }}
                className="flex space-between"
              >
                <PaymentsOutlinedIcon />
                <h2>Cash on Delivery Available</h2>
              </div>
              <h1 style={{ padding: "12px 16px 8px" }}>Return & Warranty </h1>
              <div
                style={{ padding: "8px 6px" }}
                className="flex space-between"
              >
                <HistoryOutlinedIcon />
                <h2>14 days easy return</h2>
              </div>
              <div
                style={{ padding: "7px 6px" }}
                className="flex space-between"
              >
                <RemoveModeratorOutlinedIcon />
                <h2>Warranty not available</h2>
              </div>
              <div className="flex content">
                <div className="contentImg-2">
                  <img src="https://whatsonsale.com.pk/sites/default/files/styles/large/public/deal_images/Daraz-qa-code%203%20nov%202017.jpg?itok=8fkuXfzT" />
                </div>
                <div className="scannerPop">
                  <img
                    style={{ height: "auto", width: "49px" }}
                    src="https://img.drz.lazcdn.com/g/tps/imgextra/i1/O1CN01XrNYQP1paGCVispyM_!!6000000005376-2-tps-82-82.png"
                  />
                  <p>Download app to enjoy exclusive discounts!</p>
                </div>
              </div>
              <div
                className="flex"
                style={{ justifyContent: "start", padding: "0px 0px 21px 9px" }}
              >
                <PhoneIphoneOutlinedIcon />
                <h2 style={{ padding: "0px", fontSize: "12px" }}>
                  Scan with mobile
                </h2>
              </div>
            </div>
            <div
              style={{
                padding: "0px 20px",
                backgroundColor: "#00000012",
                borderRadius: "8px 0px 0px 0px",
              }}
            >
              <div
                className="flex space-between"
                style={{ borderBottom: "0.5px solid #0000003b" }}
              >
                <div>
                  <h1>Sold by</h1>
                  <h4>Young's Foods</h4>
                  <img
                    style={{ height: "16px" }}
                    src="https://img.drz.lazcdn.com/g/tps/imgextra/i2/O1CN018pUJS01LgGhmGhAAb_!!6000000001328-2-tps-294-42.png"
                  />
                </div>
                <div>
                  <button className="link-btn">Chat Now</button>
                </div>
              </div>
              <div className="flex">
                <div
                  className="ratingRatio"
                  style={{ borderRight: "0.5px solid #0000003b" }}
                >
                  <h1>Positive Seller Ratings</h1>
                  <h3>92%</h3>
                </div>
                <div
                  className="ratingRatio"
                  style={{ borderRight: "0.5px solid #0000003b" }}
                >
                  <h1>Ship on Time</h1>
                  <h3>100%</h3>
                </div>
                <div className="ratingRatio">
                  <h1>Chat Response Rate</h1>
                  <h3>51%</h3>
                </div>
              </div>
              <button className="link-btn store-btn">GO TO STORE</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
