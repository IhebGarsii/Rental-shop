import React, { useEffect } from "react";
import { updateBookingById } from "../../apis/bookingApi.js";
import "../updateBooking/updateBooking.css";
import { useForm } from "react-hook-form";

function UpdateBooking({ booking }) {
  console.log("bookingbookingbookingbooking");
  const { register, handleSubmit, setValue } = useForm();
  // Helper function to format the date correctly
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (booking) {
      setValue("startDate", formatDate(booking.startDate));
      setValue("endDate", formatDate(booking.endDate));
      setValue("dropoffLocation", booking.dropoffLocation);
      setValue("cardNumber", booking.cardNumber);

      setValue("cvv", booking.cvv);
      setValue("licenseNumber", booking.licenseNumber);
      setValue("billingAddress", booking.billingAddress);
    }
  }, [booking, setValue]);

  const handleBook = async (data, e) => {
    e.preventDefault();
    try {
      console.log("Formatted expiryDate:", booking._id); // Change this line
      await updateBookingById(data, booking._id);
      console.log("Booking updated successfully");
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <div className="update-car">
      <form className="book-form" onSubmit={handleSubmit(handleBook)}>
        <div className="label">
          <label htmlFor="startDate">Start Date:</label>
          <input type="Date" name="startDate" {...register("startDate")} />
        </div>
        <div className="label">
          <label htmlFor="endDate">End Date:</label>
          <input type="Date" {...register("endDate")} name="endDate" />
        </div>
        <div className="label">
          <label htmlFor="dropoff_location">Droping Location:</label>
          <input
            type="text"
            name="dropoff_location"
            {...register("dropoffLocation")}
          />
        </div>
        <div className="label">
          <label htmlFor="card-number">Card Number:</label>
          <input
            type="text"
            id="card-number"
            name="card_number"
            {...register("cardNumber")}
          />
        </div>

        <div className="label">
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv" {...register("cvv")} />
        </div>
        <div className="label">
          <label htmlFor="license-number">Driver's License Number:</label>
          <input
            type="text"
            name="license-number"
            {...register("licenseNumber")}
          />
        </div>
        <div className="label">
          <label htmlFor="billing-address">Pickup Location:</label>
          <input
            type="text"
            name="billing_address"
            {...register("pickupLocation")}
          />
        </div>

        <button type="submit">Book</button>
      </form>
    </div>
  );
}

export default UpdateBooking;
