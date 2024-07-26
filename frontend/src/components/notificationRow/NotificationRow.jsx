import React from "react";
import "./notificationRow.css";
function NotificationRow({ notification }) {
  if (notification.changes) {
    return (
      <div className="notification-row">
        <div className="notification-container">
          <hr />
          <p id="noti-desc"> {notification.description}: </p>
          <h4>From:</h4>
          <span>
            
            Dropoff Location: {notification.original.dropoffLocation}
          </span>
          <span> Card Number: {notification.original.cardNumber} </span>
          <span> Expiry Date: {notification.original.expiryDate} </span>
          <span> Cvv: {notification.original.cvv} </span>
          <span> Dilling Address: {notification.original.licenseNumber} </span>
          <span> days Diffence: {notification.original.licenseNumber} </span>

          <h4>To:</h4>
          <span>
            
            Dropoff Location: {notification.changes.dropoffLocation}
          </span>
          <span> Card Number: {notification.changes.cardNumber} </span>
          <span> Expiry Date:{notification.changes.expiryDate} </span>
          <span> Cvv {notification.changes.cvv} </span>
          <span> Billing Address:{notification.changes.licenseNumber} </span>
          <span> Days Diffence: {notification.changes.licenseNumber} </span>
          <hr />
        </div>
      </div>
    );
  }
  return (
    <div className="notification-row">
      <div className="notification-container">
        <hr />
        <p id="noti-desc"> {notification.description} </p>
        <hr />
      </div>
    </div>
  );
}

export default NotificationRow;
