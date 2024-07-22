import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCar } from "../../apis/carApi";
import { getUser } from "../../apis/userApi";
import { acceptBooking, refuseBooking } from "../../apis/bookingApi";
import "./booking.css";
function Booking({ booking }) {
  const [car, setCar] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const car = await getCar(booking.idCar);
        setCar(car);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCar();
    const fetchUser = async () => {
      try {
        const user = await getUser(booking.idUser);
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handelAccept = async () => {
    try {
      //************** */
      const hireOn = new Date(booking.startDate);
      const returnOn = new Date(booking.endDate);
      hireOn.setHours(0, 0, 0, 0);
      returnOn.setHours(23, 59, 59, 999);
   /*    console.log("eeeeeeeee", car.bookingDuration); */

      const isConflict = car.bookingDuration.some((book) => {
        console.log("book", book);
        const startDate = new Date(book.startDate);
        const endDate = new Date(book.endDate);
       /*  console.log("aaaaaaa", hireOn, returnOn);
        console.log("eeeeeee", hireOn < endDate && returnOn > startDate); */
        return hireOn < endDate && returnOn > startDate;
      });

      if (isConflict) {
        console.log("The car is already booked for the selected dates.");
        return;
      }

      //*********** */
      const response = await acceptBooking(booking);
    } catch (error) {
      console.error(error);
    }
  };
  const handelRefuse = async () => {
    try {
      const response = await refuseBooking(booking._id);
      console.log("resopnse", response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="booking-component">
      {car && user && (
        <table className="booking-table">
          <thead>
            <tr>
              <th>Car Model</th>
              <th>Status</th>
              <th>User</th>
              <th>Pick-up Date</th>
              <th>Drop-off Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to={`/Car/${car._id}`}>{car.model}</Link>
              </td>
              <td>{booking.status}</td>
              <td>
                {user.firstName} {user.LastName}
              </td>
              <td> {booking.startDate}</td>
              <td>{booking.endDate}</td>
              <td>
                <button
                  className="action-button accept-button"
                  onClick={handelAccept}
                >
                  Accept
                </button>
                <button
                  className="action-button refuse-button"
                  onClick={handelRefuse}
                >
                  Refuse
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Booking;
