import React, { useEffect, useState } from "react";
import "./userBooking.css";
import { getBooking } from "../../apis/bookingApi";
import { useNavigate } from "react-router-dom";
import Booking from "../../components/booking/Booking";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function UserBooking() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { mutate } = useMutation({
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

  return (
    <div className="userBooking">
      {data &&
        data.map((booking) => (
          <Booking booking={booking} key={booking._id}>
            <div className="booking-wrapper">
              <Booking.Full />
              <Booking.Actions />
            </div>
          </Booking>
        ))}
    </div>
  );
}
export default UserBooking;
