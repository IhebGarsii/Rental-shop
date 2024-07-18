import React from "react";
import "./carCard.css";

import { Link } from "react-router-dom";
function CarCard({ car, homePage }) {
  if (!homePage) {
    var home = true;
  } else {
    home = false;
  }
  console.log("homePagehomePagehomePagehomePage", homePage);
  return (
    <div className="carCard">
      <img
        className="car-img"
        src={`http://localhost:4000/uploads/cars/${car.images[0]}`}
        alt=""
      />
      <div className="detail-link">
        <h2> {car.model} </h2>
        <Link to={`/car/${car._id}`}>See More </Link>
      </div>
      {home && <p className="car-desc"> {car.description} </p>}
      <div className="basic-info">
        <span className="car-seat"> Seating Capacity {car.seats} </span>

        <span className="car-seat">
          {" "}
          <span> {car.dailyRent}</span>$ a day{" "}
        </span>
      </div>

      <p className="car-desc"> {car.conditions} </p>
    </div>
  );
}

export default CarCard;
