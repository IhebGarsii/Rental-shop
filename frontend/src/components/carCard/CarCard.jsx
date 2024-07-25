import React from "react";
import "./carCard.css";

import { Link } from "react-router-dom";
function CarCard({ car, homePage }) {
  if (!homePage) {
    var home = true;
  } else {
    home = false;
  }
  return (
    <div className="carCard">
      <div className="card">
        <div className="card-img">
          <div className="img">
            <img
              className="car-img"
              src={`http://localhost:4000/uploads/cars/${car.images[0]}`}
              alt=""
            />
          </div>
        </div>
        <div className="card-title">{car.model}</div>
        <div className="card-subtitle">{car.description}</div>
        <hr className="card-divider" />
        <div className="card-footer">
          <div className="card-price">
            <span>$</span> {car.dailyRent} | {car.seats} <span>seats</span>
          </div>
          <button className="card-btn">
            <Link to={`/car/${car._id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
              </svg>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
