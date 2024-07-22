import React, { useEffect } from "react";
import { updateBookingById } from "../../apis/bookingApi.js";
import "../bookCar/bookCar.css";
import { useForm } from "react-hook-form";

function UpdateBooking({ booking }) {
  const { register, handleSubmit, setValue } = useForm();
  console.log("eeeeeeeeee");
  // Helper function to format the date correctly
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formatExpiryDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      console.error("Invalid date:", dateString); // Add error logging
      return "";
    }
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  useEffect(() => {
    if (booking) {
      console.log("booking", booking);
      setValue("startDate", formatDate(booking.startDate));
      setValue("endDate", formatDate(booking.endDate));
      setValue("dropoffLocation", booking.dropoffLocation);
      setValue("cardNumber", booking.cardNumber);
      setValue("expiryDate", formatExpiryDate(booking.expiryDate));

      setValue("cvv", booking.cvv);
      setValue("licenseNumber", booking.licenseNumber);
      setValue("billingAddress", booking.billingAddress);
    }
  }, [booking, setValue]);

  const handleBook = async (data, e) => {
    e.preventDefault();
    try {
      console.log("Formatted expiryDate:", data.expiryDate); // Change this line
      await updateBookingById(data, booking._id);
      console.log("Booking updated successfully");
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <div className="update-car">
      <form className="book-form" onSubmit={handleSubmit(handleBook)}>
        <div className="update-label">
          <label htmlFor="startDate">Start Date</label>
          <input type="date" name="startDate" {...register("startDate")} />
        </div>
        <div className="update-label">
          <label htmlFor="endDate">End Date</label>
          <input type="date" {...register("endDate")} name="endDate" />
        </div>
        <div className="update-label">
          <label htmlFor="dropoff_location">Dropoff Location</label>
          <input
            type="text"
            name="dropoff_location"
            {...register("dropoffLocation")}
          />
        </div>
        <div className="update-label">
          <label htmlFor="card-number">Card Number:</label>
          <input
            type="text"
            id="card-number"
            name="card_number"
            {...register("cardNumber")}
          />
        </div>
        <div className="update-label">
          <label htmlFor="expiry-date">Expiry Date:</label>
          <input
            type="month"
            id="expiry_date"
            {...register("expiryDate")}
            name="expiry_date"
          />
        </div>
        <div className="update-label">
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv" {...register("cvv")} />
        </div>
        <div className="updalabel">
          <label htmlFor="license-number">Driver's License Number:</label>
          <input
            type="text"
            name="license-number"
            {...register("licenseNumber")}
          />
        </div>
        <div className="update-label">
          <label htmlFor="billing-address">Billing Address:</label>
          <input
            type="text"
            name="billing_address"
            {...register("billingAddress")}
          />
        </div>
        <button type="submit">Update Booking</button>
      </form>
    </div>
  );
}

export default UpdateBooking;
