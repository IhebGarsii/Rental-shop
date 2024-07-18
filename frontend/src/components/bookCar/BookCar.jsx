import React, { useEffect, useState } from "react";
import { bookCar } from "../../apis/bookingApi";
import "./bookCar.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function BookCar({ car }) {
  const [render, setRender] = useState(false);
  const { register, handleSubmit, setError, clearErrors, watch } = useForm();
  const handleBook = async (data, e) => {
    e.preventDefault();

    try {
      const hireOn = new Date(data.startDate);
      const returnOn = new Date(data.endDate);

      hireOn.setHours(0, 0, 0, 0);
      returnOn.setHours(23, 59, 59, 999);
      console.log("eeeeeeeee", car.bookingDuration);

      const isConflict = car.bookingDuration.some((book) => {
        const startDate = new Date(book.startDate);
        const endDate = new Date(book.endDate);
        console.log("aaaaaaa", hireOn, returnOn);
        console.log("eeeeeee", hireOn < endDate && returnOn > startDate);
        return hireOn < endDate && returnOn > startDate;
      });

      if (isConflict) {
        toast.error("The car is already booked for the selected dates.");
        return;
      }

      const book = await bookCar(car._id, localStorage.getItem("idUser"), data);

      setRender(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, [render]);
  return (
    <div className="book-car">
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
          <label htmlFor="time">Payment Duration:</label>
          <select className="time" name="time">
            <option value="DAYS">Daily</option>
            <option value="WEEK">Weekly</option>
            <option value="MONTH">Monthly</option>
          </select>
        </div>
        <div className="label">
          <label htmlFor="expiry-date">Expiry Date:</label>
          <input
            type="month"
            id="expiry_date"
            {...register("expiryDate")}
            name="expiry_date"
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
          <label htmlFor="billing-address">Billing Address:</label>
          <input
            type="text"
            name="billing_address"
            {...register("billingAddress")}
          />
        </div>

        <button type="submit">Book</button>
      </form>
    </div>
  );
}

export default BookCar;
