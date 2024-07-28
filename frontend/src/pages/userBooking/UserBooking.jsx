import React, { useEffect, useState } from "react";
import "./userBooking.css";
import { getBooking } from "../../apis/bookingApi";
import { useNavigate } from "react-router-dom";
import Booking from "../../components/booking/Booking";

function UserBooking() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("idUser")) {
      return navigate("/login");
    }
    const fetchBookingById = async () => {
      try {
        const booking = await getBooking(localStorage.getItem("idUser"));

        setData(booking);

        booking.some((book) => {
          if (book.status === "ACCEPTED") {
            book.payCheck = true;
          }
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookingById();
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
