import React from "react";
import { Payment } from "./payment";
import { Summary } from "./summary";
import { NavLink, useNavigate } from "react-router-dom";

import '../checkout/checkout.css'

const CheckOut = () => {
  const ticketDetails = JSON.parse(sessionStorage.getItem("BookingDetails"));
  const navigate = useNavigate();
  return (
    <div className="check-out">
      <button className="back-button"
        onClick={() => {
          navigate(-2);
        }}
      >
        Back
      </button>
      <h1 className="checkout-heading">Checkout</h1>
      <div className="wraper-checkout">
        <Summary BookingDetails={ticketDetails} />
        <Payment />
      </div>
    </div>
  );
}


export default CheckOut;