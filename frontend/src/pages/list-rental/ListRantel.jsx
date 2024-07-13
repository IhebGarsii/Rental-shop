import React, { useEffect, useState } from "react";
import "./listRantel.css";
import { getCars } from "../../apis/carApi";
import MultiRangeSlider from "multi-range-slider-react";
import CarCard from "../../components/carCard/CarCard";
import { useForm } from "react-hook-form";
function ListRantel() {
  const { register, handleSubmit } = useForm();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState([]);
  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };
  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const carsList = await getCars();
        if (carsList) {
          setCars(carsList);
          setFilter(carsList);
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
  const onSubmitFiltre = (data) => {
    const filteredCars = cars.filter((car) => {
      const hireOn = new Date(data.hireOn);
      const returnOn = new Date(data.returnOn);
      
      const isAvailable =
        hireOn >= new Date(car.startDate) && returnOn <= new Date(car.endDate);
      console.log("date", returnOn <= new Date(car.endDate));

      const isWithinPriceRange =
        car.dailyRent >= minValue && car.dailyRent <= maxValue;

      const isMatchingType =
        (!data.compact || car.type === "compact") &&
        (!data.suv || car.type === "suv") &&
        (!data.coach || car.type === "coach") &&
        (!data.mpv || car.type === "mpv") &&
        (!data.sedan || car.type === "sedan");

      return isAvailable && isWithinPriceRange && isMatchingType;
    });
    console.log("lets seee", filteredCars);

    setFilter(filteredCars);
  };
  if (isLoading) {
    return <div>loadinggggggggggggggggggg</div>;
  }
  if (error) {
    return <div> dssd {error} </div>;
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitFiltre)} className="car-list-filter">
        <div className="availability">
          <h3>AVAILABLE ON</h3>
          <input type="Date" placeholder="Hire On" {...register("hireOn")} />
          <input
            type="Date"
            placeholder="Return On"
            {...register("returnOn")}
          />
        </div>
        <div className="price-filter">
          <label htmlFor="price">PRICE a day</label>
          <MultiRangeSlider
            min={0}
            max={100}
            step={5}
            minValue={minValue}
            maxValue={maxValue}
            onInput={(e) => {
              handleInput(e);
            }}
          />
          <div className="ranged-input">
            <span> {minValue} </span> <span> {maxValue} </span>
          </div>
          <div className="fiter-chekbox">
            <div className="filter-lable">
              <input type="checkbox" {...register("compact")} />

              <label htmlFor="">Compact</label>
            </div>
            <div className="filter-lable">
              <input type="checkbox" {...register("suv")} />

              <label htmlFor="">SUV</label>
            </div>
            <div className="filter-lable">
              <input type="checkbox" {...register("coach")} />

              <label htmlFor="">Coach</label>
            </div>

            <div className="filter-lable">
              <input type="checkbox" {...register("mpv")} />
              <label htmlFor="MPV">MPV</label>
            </div>
            <div className="filter-lable">
              <input type="checkbox" {...register("sedan")} />
              <label htmlFor="">Sedan</label>
            </div>
          </div>
        </div>
        <button type="submit">filtre</button>
      </form>
      <div className="ListRantel">
        {cars && cars.map((car) => <CarCard car={car} key={car._id} />)}
      </div>
    </>
  );
}

export default ListRantel;
