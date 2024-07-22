import React, { useEffect, useState } from "react";
import "./userBooking.css";
import { getBooking, deleteBooking } from "../../apis/bookingApi";
import { pay } from "../../apis/PaymentApi";
import { Link, useNavigate } from "react-router-dom";
import UpdateBooking from "../../components/updateBooking/UpdateBooking";
import { RxCross2 } from "react-icons/rx";

function UserBooking() {
  const [data, setData] = useState([]);
  const [rent, setRent] = useState(false);
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

  const handleDelete = async (idBooking) => {
    try {
      const booking = await deleteBooking(idBooking);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePayment = async (booking) => {
    try {
      const payment = await pay(booking);
      console.log("payment", payment.url);

      window.location = payment.url;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="userBooking">
      {data &&
        data.map((booking) => (
          <div key={booking._id}>
            {/* <table className="booking-table">
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
                  <td>
                    <button
                      disabled={!booking.payCheck}
                      onClick={() => handlePayment(booking)}
                    >
                      Pay
                    </button>
                  </td>
                </tr>
              </tbody>
            </table> */}
            <div className="">
              <div className="">
                <img
                  src={`http://localhost:4000/uploads/cars/${booking.idCar.images[0]}`}
                  alt=""
                />
              </div>
              <div className="">
                <h3> {booking.idCar.model} </h3>{" "}
                <span>{booking.fullPrice}$</span>
                <h3> {booking.startDate} </h3>
                <h3> {booking.endDate} </h3>
                <span>Pick Up Location : {booking.pickupLocation}</span>
                <span>Drop Off Location : {booking.dropoffLocation}</span>
              </div>
              <div className="">
                <img
                  src={`http://localhost:4000/uploads/users/${booking.idUser.image}`}
                  alt=""
                />
              </div>
            </div>
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
