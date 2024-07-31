import React, { useEffect, useState } from "react";
import "./userBooking.css";
import { getBooking } from "../../apis/bookingApi";
import { useNavigate } from "react-router-dom";
import Booking from "../../components/booking/Booking";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "../../components/loading/Loader";

function UserBooking() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: getBooking,
    onSuccess: (data) => {
      setData(data);
      data.some((book) => {
        if (book.status === "ACCEPTED") {
          book.payCheck = true;
        }
      });
    },
    onError: (error) => {
      console.log("fetching booking failed", error);
      toast.error("fetching booking failed", error);
    },
  });
  useEffect(() => {
    if (!localStorage.getItem("idUser")) {
      return navigate("/login");
    } else {
      mutate(localStorage.getItem("idUser"));
    }
  }, []);
  if (isPending) {
    return (
      <div className="loader-booking">
        <div className="loader-c">
          <Loader />
        </div>
      </div>
    );
  }
  return (
    <div className="userBooking">
      {data && data.length > 0 ? (
        data.map((booking) => (
          <Booking booking={booking} key={booking._id}>
            <div className="booking-wrapper">
              <Booking.Full />
              <Booking.Actions />
            </div>
          </Booking>
        ))
      ) : (
        <p className="no-cars">No bookings available!</p>
      )}
    </div>
  );
}
export default UserBooking;
