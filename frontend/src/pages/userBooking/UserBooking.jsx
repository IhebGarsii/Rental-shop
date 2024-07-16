import React, { useEffect, useState } from "react";
import "./userBooking.css";
import { getBooking, deleteBooking } from "../../apis/bookingApi";
import { Link } from "react-router-dom";
import UpdateBooking from "../../components/updateBooking/UpdateBooking";
import { RxCross2 } from "react-icons/rx";

function UserBooking() {
  const [data, setData] = useState([]);
  const [rent, setRent] = useState(false);
  useEffect(() => {
    const fetchBookingById = async () => {
      try {
        const booking = await getBooking(localStorage.getItem("idUser"));

        setData(booking);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookingById();
  }, []);

  const handleDelete = async (idBooking) => {
    try {
      const booking = await deleteBooking(idBooking);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="userBooking">
      {data &&
        data.map((booking) => (
          <div key={booking._id}>
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
                  <td className="wid">
                    <Link to={`/Car/${booking.idCar._id}`}>
                      {booking.idCar.model}
                    </Link>
                  </td>
                  <td>{booking.status}</td>
                  <td>
                    {booking.idUser.firstName} {booking.idUser.LastName}
                  </td>
                  <td> {booking.startDate}</td>
                  <td>{booking.endDate}</td>
                  <td>
                    <button
                      onClick={() => setRent(!rent)}
                      className="action-button accept-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="action-button refuse-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            {rent && (
              <div className="rent-form-displays">
                <div className="rent-form-display-center">
                  <UpdateBooking key={booking.idCar._id} booking={booking} />
                  <RxCross2
                    className="close-u-btn"
                    onClick={() => setRent(false)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default UserBooking;
