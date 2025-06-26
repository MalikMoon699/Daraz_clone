import React, { useState } from "react";
import { Modal } from "@mui/material";
import OrderPlace from "./OrderSubmit";

const Services = ({ handleClose }) => {
  const [order, setOrder] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const isFormValid = formData.name && formData.subject && formData.message;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid) return; 

    const data = new FormData(event.target);
    data.append("access_key", "78a4f87b-f147-4be2-96f3-72f5ce860ac4");

    const json = JSON.stringify(Object.fromEntries(data));

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      handlOrderSubmit();
    }
  };

  const handlOrderSubmit = () => {
    setOrder(true);
    setTimeout(() => setOrder(false), 3000);
  };

  return (
    <>
      <Modal className="flex" open={order} onClose={() => setOrder(false)}>
        <div>
          <OrderPlace />
        </div>
      </Modal>

      <div className="viewPage">
        <h2
          style={{
            fontSize: "large",
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
          }}
        >
          Help Center
        </h2>
        <div className="sameContainer">
          <form onSubmit={onSubmit}>
            <div className="inputContainer">
              <label htmlFor="name">Enter Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="subject">Order Details</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Order Details"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="message">Describe Your Problem</label>
              <textarea
                name="message"
                placeholder="Describe your problem"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="flex">
              <button
                type="button"
                onClick={handleClose}
                className="btn-2 buy-btn"
              >
                Cancel
              </button>
              <button
                className="btn-2 cart-btn"
                type="submit"
                disabled={!isFormValid}
                style={{
                  opacity: isFormValid ? "1" : "0.5",
                  cursor: isFormValid ? "pointer" : "not-allowed",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Services;

