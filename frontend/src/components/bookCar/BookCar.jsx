import React, { useEffect, useState } from "react";
import { bookCar } from "../../apis/bookingApi";
import "./bookCar.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../loading/Loader";
function BookCar({ car }) {
  const [render, setRender] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleBook = async (data, e) => {
    setIsLoading(true);
    if (!localStorage.getItem("idUser")) {
      console.log("dssssssssss", !localStorage.getItem("idUser"));
      setIsLoading(false);
      return navigate("/login");
    }
    e.preventDefault();

    try {
      const hireOn = new Date(data.startDate);
      const returnOn = new Date(data.endDate);

      hireOn.setHours(0, 0, 0, 0);
      returnOn.setHours(23, 59, 59, 999);

      const isConflict = car.bookingDuration.some((book) => {
        const startDate = new Date(book.startDate);
        const endDate = new Date(book.endDate);

        return hireOn < endDate && returnOn > startDate;
      });

      if (isConflict) {
        setIsLoading(false);
        toast.error("The car is already booked for the selected dates.");
        return;
      }

      const book = await bookCar(car._id, localStorage.getItem("idUser"), data);
      setIsLoading(false);
      setRender(true);
    } catch (error) {
      setIsLoading(false);

      console.error(error);
    } finally {
      setIsLoading(false);
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
          <select className="time" name="time" {...register("paymentType")}>
            <option value={car.dailyRent}>Daily</option>
            <option value={car.weeklyRent}>Weekly</option>
            <option value={car.monthlyRent}>Monthly</option>
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
          <label htmlFor="billing-address">Pickup Location:</label>
          <input
            type="text"
            name="billing_address"
            {...register("pickupLocation")}
          />
        </div>

        <button type="submit"> {isLoading ? <Loader /> : "Book"} </button>
      </form>
    </div>
  );
}

export default BookCar;
