import React, { Component, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

const AutoSlider = () => {
  const [slider, setSlider] = useState([
    {
      img: "https://img.lazcdn.com/us/domino/17faa203-90f1-4e9b-825a-f24567e748bd_PK-1976-688.jpg_2200x2200q80.jpg",
    },
    {
      img: "https://img.lazcdn.com/us/domino/f1e8cafe-bb4f-4315-9da8-7d2852ebe6d4_PK-1976-688.jpg_2200x2200q80.jpg",
    },
    {
      img: "https://img.lazcdn.com/us/domino/afc1c793-0314-40b2-ab81-4d342417cf27_PK-1976-688.jpg_2200x2200q80.jpg",
    },
    {
      img: "https://img.lazcdn.com/us/domino/7abb34ba-2a89-4722-a724-4722a3a0f90f_PK-1976-688.jpg_2200x2200q80.jpg",
    },
    {
      img: "https://img.lazcdn.com/us/domino/f35e0394-69d5-4f57-b66f-72655c352288_PK-1976-688.jpg_2200x2200q80.jpg",
    },
    {
      img: "https://img.lazcdn.com/us/domino/ccba83db-0234-44bd-9876-4cc7a1018236_PK-1976-688.jpg_2200x2200q80.jpg",
    },
  ]);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <div className="slider">
      <div className="flex">
        <div
          className="slider-container"
          style={{
            width: "68%",
            height: "344px",
            objectFit: "cover",
            cursor: "pointer",
          }}
        >
          <Slider {...settings}>
            {slider.map((slide) => (
              <div key={slide}>
                <img
                  src={slide.img}
                  style={{ width: "1000px", height: "344px" }}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="slider-right-module">
          <div className="flex module-title">
            <img src="https://img.lazcdn.com/us/domino/1ee015d6a5c62fd0339c88c657c1c183.jpg_120x120q80.jpg" />
            <div className="title">TRY DARAZ APP</div>
          </div>
          <div className="module-content">
            <h1 style={{ color: "white" }}>
              <StarOutlinedIcon />
              4.8 Rated
            </h1>
            <h2 style={{ color: "white" }}>Download the App now</h2>
            <div
              className="flex"
              style={{ justifyContent: "start", padding: "5px 20px" }}
            >
              <img src="https://img.lazcdn.com/g/tps/imgextra/i2/O1CN01n3PMa828kJZVuCbPp_!!6000000007970-2-tps-72-72.png_150x150q80.png" />
              <h3 style={{ color: "white" }}> Free Shipping</h3>
            </div>
            <div
              className="flex"
              style={{ justifyContent: "start", padding: "0px 20px 5px 20px" }}
            >
              <img src="https://img.lazcdn.com/g/tps/imgextra/i3/O1CN01J03SMW1lebTE7xkaN_!!6000000004844-2-tps-72-72.png_150x150q80.png" />
              <h3 style={{ color: "white" }}> Exclusive Vouchers</h3>
            </div>
          </div>
          <div className="flex content">
            <div className="contentImg">
              <img src="https://img.drz.lazcdn.com/g/tps/imgextra/i2/O1CN01jHjmpl1pxcRVgFrYS_!!6000000005427-0-tps-150-150.jpg_360x360q80.jpg" />
            </div>
            <div className="contentImgDownload">
              <a href="https://apps.apple.com/pk/app/daraz-online-shopping-app/id978058048">
                <img src="https://img.lazcdn.com/g/tps/imgextra/i4/O1CN01uAl8kB1wEv2DNjdhB_!!6000000006277-2-tps-125-36.png" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.daraz.android&pli=1">
                <img src="https://img.lazcdn.com/g/tps/imgextra/i1/O1CN01QJGFfc1S0mKngu4rQ_!!6000000002185-2-tps-125-36.png" />
              </a>
            </div>
          </div>
          <h6>Download the App Now!</h6>
        </div>
      </div>
      <div
        className="flex downContext"
        style={{ overflow: "hidden", cursor: "pointer" }}
      ></div>
    </div>
  );
};

export default AutoSlider;
