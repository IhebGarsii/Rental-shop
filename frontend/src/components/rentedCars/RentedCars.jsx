import React, { useEffect, useState } from "react";
import "rentedCars.css";
import { getRandomCars } from "../../apis/carApi";
function RentedCars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = getRandomCars();
        if (!response) {
          throw new Error("faild to fetch cars");
        }
        setCars(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCars();
  }, []);
  return <div>{cars && cars.map((car) => <div>
    
  </div>)}</div>;
}

export default RentedCars;
