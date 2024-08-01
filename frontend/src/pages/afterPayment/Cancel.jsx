import React from "react";
import "./cancel.css";
function Cancel() {
  return (
    <div className="cancel-page">
      <div className="cancel-container">
        <h1 className="cancel">Payment Canceled</h1>
        <p>
          We're sorry, but your payment has been canceled. If you need
          assistance or wish to try again, please contact support.
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

export default Cancel;
