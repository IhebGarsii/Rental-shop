import React, { useState } from "react";
import { bookCar } from "../../apis/bookingApi";
import "./bookCar.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../loading/Loader";
import { useMutation } from "@tanstack/react-query";

function BookCar({ car }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { mutate: mutateBook } = useMutation({
    mutationFn: (formData) => {
      return bookCar(car._id, localStorage.getItem("idUser"), formData);
    },
    onSuccess: () => {
      toast.success(
        "Your booking is saved. Please wait for the admin to accept your booking."
      );
    },
    onError: (error) => {
      toast.error(`Error in booking the car: ${error.message}`);
    },
  });

  const handleBook = async (data, e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!localStorage.getItem("idUser")) {
      setIsLoading(false);
      return navigate("/login");
    }

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
        toast.error("The car is already booked for the selected dates.");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.endDate);
      if (data.DrivingLicence[0]) {
        formData.append("DrivingLicence", data.DrivingLicence[0]);
      }
      formData.append("dropoffLocation", data.dropoffLocation);
      formData.append("pickupLocation", data.pickupLocation);

      await mutateBook(formData);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Error in booking the car.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="book-car">
      <form className="book-form" onSubmit={handleSubmit(handleBook)}>
        <div className="label">
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" name="startDate" {...register("startDate")} />
        </div>
        <div className="label">
          <label htmlFor="endDate">End Date:</label>
          <input type="date" {...register("endDate")} name="endDate" />
        </div>
        <div className="label">
          <label htmlFor="driving-licence">Driving Licence:</label>
          <input
            type="file"
            name="DrivingLicence"
            {...register("DrivingLicence")}
          />
        </div>
        <div className="label">
          <label htmlFor="dropoffLocation">Dropoff Location:</label>
          <input
            type="text"
            name="dropoffLocation"
            {...register("dropoffLocation")}
          />
        </div>
        <div className="label">
          <label htmlFor="pickupLocation">Pickup Location:</label>
          <input
            type="text"
            name="pickupLocation"
            {...register("pickupLocation")}
          />
        </div>

        <button type="submit">{isLoading ? <Loader /> : "Book"}</button>
      </form>
    </div>
  );
}

export default BookCar;
