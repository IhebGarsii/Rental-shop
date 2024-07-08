import React, { useEffect, useState } from "react";
import "./listRantel.css";
import { getCars } from "../../apis/carApi";
import CarCard from "../../components/carCard/CarCard";
function ListRantel() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const carsList = await getCars();
        if (carsList) {
          setCars(carsList);
          setIsLoading(false);
          setError(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, []);
  if (isLoading) {
    return <div>loadinggggggggggggggggggg</div>;
  }
  if (error) {
    return <div> dssd {error} </div>;
  }
  return (
    <div className="ListRantel">
      {cars && cars.map((car) => <CarCard car={car} key={car._id} />)}
    </div>
  );
}

export default ListRantel;
