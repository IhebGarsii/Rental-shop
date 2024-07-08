import React, { useState } from "react";
import { bookCar } from "../../apis/carApi";

function BookCar({ car }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const handleBook = async (e) => {
    e.preventDefault();
    try {
      console.log(car._id);
      const data = {
        startDate,
        endDate,
      };
      const book = await bookCar(car._id, localStorage.getItem("idUser"), data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form action="">
        <input type="Date" onChange={(e) => setStartDate(e.target.value)} />
        <input type="Date" onChange={(e) => setEndDate(e.target.value)} />

        <button onClick={handleBook}>Book</button>
      </form>
    </div>
  );
}

export default BookCar;
