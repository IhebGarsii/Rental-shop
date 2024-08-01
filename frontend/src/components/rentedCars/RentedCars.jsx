import React, { useEffect, useState } from "react";
import "rentedCars.css";
import { getRentedCars } from "../../apis/carApi";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loading/Loader";
function RentedCars() {
  const {
    data: cars,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["rentedCars"], queryFn: getRentedCars });

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-center">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div>{cars && cars.map((car) => <div className="rented-cars"></div>)}</div>
  );
}

export default RentedCars;
