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
          <div className="userBooking-container" key={booking._id}>
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
            <div className="userBooking-left-middle">
              <div className="userBooking-left">
                <img
                  src={`http://localhost:4000/uploads/cars/${booking.idCar.images[0]}`}
                  alt=""
                />
              </div>
              <div className="userBooking-middle">
                <div className="userBooking-title">
                  <Link to={`/car/${booking.idCar._id}`}>
                    <h2>{booking.idCar.model} </h2>
                  </Link>

                  <span>{booking.fullPrice}$</span>
                </div>
                <h3> {booking.startDate} </h3>
                <h3> {booking.endDate} </h3>
                <span>Pick Up Location : {booking.pickupLocation}</span>
                <span>Drop Off Location : {booking.dropoffLocation}</span>
                <div className="action">
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
                  <button
                    disabled={!booking.payCheck}
                    onClick={() => handlePayment(booking)}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
            <div className="userBooking-right">
              <img
                src={`http://localhost:4000/uploads/users/${booking.idUser.image}`}
                alt=""
              />
              <h3>
                {booking.idUser.firstName} {booking.idUser.lastName}
              </h3>
              <h4>Rented Cars: </h4>
              <div className="rented-car-list">
                {booking.idUser.idCars.map((car, index) => (
                  <Link
                    to={`/car/${car._id}`}
                    className="menu__link"
                    key={index}
                  >
                    {car.model}
                    {"-->"}
                  </Link>
                ))}
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
