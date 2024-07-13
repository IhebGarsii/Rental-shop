import React, { useEffect, useState } from "react";
import { bookCar } from "../../apis/bookingApi";
import "./bookCar.css";
import { useForm } from "react-hook-form";
function BookCar({ car }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [render, setRender] = useState(false);
  const { register, handleSubmit } = useForm();
  const handleBook = async (data, e) => {
    e.preventDefault();
    try {
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
          <label htmlFor="startDate">Start Date</label>
          <input
            type="Date"
            name="startDate"
            {...register("startDate")}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="label">
          <label htmlFor="endDate">End Date</label>
          <input
            type="Date"
            {...register("endDate")}
            name="endDate"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="label">
          <label htmlFor="dropoff_location">Droping Location</label>
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
            required
          />
        </div>
        <div className="label">
          <label htmlFor="expiry-date">Expiry Date:</label>
          <input
            type="month"
            id="expiry_date"
            {...register("expiryDate")}
            name="expiry_date"
            required
          />
        </div>
        <div className="label">
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            {...register("cvv")}
            required
          />
        </div>
        <div className="label">
          <label htmlFor="license-number">Driver's License Number:</label>
          <input
            type="text"
            name="license-number"
            {...register("licenseNumber")}
            required
          />
        </div>
        <div className="label">
          <label htmlFor="billing-address">Billing Address:</label>
          <input
            type="text"
            name="billing_address"
            {...register("billingAddress")}
            required
          />
        </div>

        <button type="submit">Book</button>
      </form>
    </div>
  );
}

export default BookCar;
