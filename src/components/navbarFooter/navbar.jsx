import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { API_Endpoints } from "../../api/url";
import { Modal } from "@mui/material";
import Services from "../pages/assestsPages/submit/Services";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [appLink, setAppLink] = useState(false);
  const [services, setServices] = useState(false);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await fetch(`${API_Endpoints}/cart`);
        if (response.ok) {
          const data = await response.json();
          setCartCount(data.length);
        }
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    fetchCartCount();
  }, []);

  const handleAppLinkOpen = () => {
    setAppLink(true);
  };
  const handleAppLinkClose = () => {
    setAppLink(false);
  };
  const handleServicesOpen = () => {
    setServices(true);
  };
  const handleServicesClose = () => {
    setServices(false);
  };

  return (
    <>
    <div>
      
    </div>
      <Modal open={appLink} onClose={() => setAppLink(false)}>
        <div
          onClick={handleAppLinkClose}
          className="flex"
          style={{ alignItems: "center", outline: "0" }}
        >
          <div className="content modalDownload">
            <h6>Download the App</h6>
            <div className=" flex">
              <img src="https://gw.alicdn.com/imgextra/i2/O1CN01jHjmpl1pxcRVgFrYS_!!6000000005427-0-tps-150-150.jpg" />
            </div>
            <div style={{ padding: "9px 2px" }} className="flex">
              <a href="https://apps.apple.com/pk/app/daraz-online-shopping-app/id978058048">
                <img
                  style={{ marginRight: "5px" }}
                  src="https://img.lazcdn.com/g/tps/imgextra/i4/O1CN01uAl8kB1wEv2DNjdhB_!!6000000006277-2-tps-125-36.png"
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.daraz.android&pli=1">
                <img
                  style={{ marginLeft: "5px" }}
                  src="https://img.lazcdn.com/g/tps/imgextra/i1/O1CN01QJGFfc1S0mKngu4rQ_!!6000000002185-2-tps-125-36.png"
                />
              </a>
            </div>
          </div>
        </div>
      </Modal>

      <Modal open={services} onClose={() => setServices(false)}>
        <div className="flex" style={{ height: "100vh", outline: "0" }}>
          <div className="flex support">
            <Services handleClose={handleServicesClose} />
          </div>
        </div>
      </Modal>
      <nav>
        <div
          className="flex"
          style={{ justifyContent: "end", padding: "6px 50px" }}
        >
          <ul className="flex navUl">
            <li onClick={handleAppLinkOpen}>Save More on App</li>
            <li onClick={()=>navigate("/sellProduct")}>Sell On Daraz</li>
            <li onClick={handleServicesOpen}>Help & Support</li>
            <li>Login</li>
            <li>Sign Up</li>
          </ul>
        </div>
        <div className="flex navBox">
          <div className="flex space-between">
            <div onClick={() => navigate("/")}>
              <img src="https://lzd-img-global.slatic.net/us/domino/3b870cb043c7f8a9741cbf66329e294e.png" />
            </div>
            <div className="flex">
              <div className="flex search">
                <input type="text" placeholder="Search in Daraz" />
                <SearchIcon />
              </div>
              <div
                onClick={() => navigate("/cart")}
                style={{ position: "relative" }}
              >
                {cartCount > 0 && <p className="cart-item">{cartCount}</p>}
                <ShoppingCartOutlinedIcon className="add-cart" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
