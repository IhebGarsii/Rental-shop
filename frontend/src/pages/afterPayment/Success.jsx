import React from "react";
import "./success.css";
function Success() {
  return (
    <div className="success-page">
      <div className="success-container">
        <h1>Payment Successful</h1>
        <p>
          Thank you for your purchase! The car is now reserved and waiting for
          you.
        </p>
        <button
          className="btn-primary"
          onClick={() => (window.location.href = "/home")}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default Success;
