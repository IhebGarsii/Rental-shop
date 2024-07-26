import React, { useEffect, useState } from "react";
import "./userBooking.css";
import { getBooking, deleteBooking } from "../../apis/bookingApi";
import { pay } from "../../apis/PaymentApi";
import { Link, useNavigate } from "react-router-dom";
import UpdateBooking from "../../components/updateBooking/UpdateBooking";
import { RxCross2 } from "react-icons/rx";
import Delete from "../../components/button/Delete";

function UserBooking() {
  console.log("render");
  const [data, setData] = useState([]);
  const [editingBookingId, setEditingBookingId] = useState(null);
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
      const ss = await deleteBooking(idBooking);
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
  const handleEditClick = (bookingId) => {
    setEditingBookingId(bookingId);
  };
  const handleCloseEdit = () => {
    setEditingBookingId(null);
  };

  return (
    <div className="userBooking">
      {data &&
        data.map((booking) => (
          <div className="userBooking-container" key={booking._id}>
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
                    onClick={() => handleEditClick(booking._id)}
                    className="Btn"
                  >
                    Edit
                    <svg className="svg" viewBox="0 0 512 512">
                      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                    </svg>
                  </button>
                  <Delete onClick={() => handleDelete(booking._id)} />
                  <button
                    disabled={!booking.payCheck}
                    onClick={() => handlePayment(booking)}
                    className="pay-btn"
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

            {editingBookingId === booking._id && (
              <div className="rent-form-displays">
                <div className="rent-form-container">
                  <UpdateBooking booking={booking} />
                  <RxCross2 className="close-u-btn" onClick={handleCloseEdit} />
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
export default UserBooking;
