import React, { useEffect } from "react";
import { updateBookingById } from "../../apis/bookingApi.js";
import "../updateBooking/updateBooking.css";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function UpdateBooking({ booking }) {
  const { register, handleSubmit, setValue } = useForm();
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

  const handleBook = async (data) => {
    mutateUpdateBook(data);
  };
  const { mutate: mutateUpdateBook } = useMutation({
    mutationFn: (data) => updateBookingById(data, booking._id),
    onSuccess: () => {
      toast.success("booking updated with success");
    },
    onError: (error) => {
      toast.error("error in updating the booking", error);
    },
  });

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
          <label htmlFor="driving-licence">Driving Licence:</label>
          <input
            type="file"
            name="driving-licence"
            {...register("DrivingLicence")}
          />
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
          <label htmlFor="billing-address">Pickup Location:</label>
          <input
            type="text"
            name="billing_address"
            {...register("pickupLocation")}
          />
        </div>

        <button className="update-booking" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateBooking;
