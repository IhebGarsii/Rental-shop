import React, { useEffect, useState } from "react";
import "./listRantel.css";
import { getCars } from "../../apis/carApi";
import MultiRangeSlider from "multi-range-slider-react";
import CarCard from "../../components/carCard/CarCard";
import { useForm } from "react-hook-form";
import Loader from "../../components/loading/Loader";
import { useQuery } from "@tanstack/react-query";

function ListRantel() {
  const { register, handleSubmit, reset } = useForm();
  const [filter, setFilter] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [currentR, setCurrentR] = useState(1);

  const {
    isLoading,
    isError,
    data: cars = [],
    error,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  useEffect(() => {
    // Set filter when cars data is fetched
    setFilter(cars);
  }, [cars]);

  const handleInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  const resetFilter = () => {
    reset();
    setFilter(cars);
  };

  const itemsPerPage = 9;
  const NbPage = Math.ceil(filter.length / itemsPerPage);

  const startIndex = (currentR - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataPerPage = filter.slice(startIndex, endIndex);

  const onSubmitFilter = (data) => {
    const filteredCars = cars.filter((car) => {
      const hireOn = new Date(data.hireOn);
      const returnOn = new Date(data.returnOn);

      // Ensure the dates are properly set to the start of the day for comparison
      hireOn.setHours(0, 0, 0, 0);
      returnOn.setHours(23, 59, 59, 999);

      const startDate = new Date(car.startDate);
      const endDate = new Date(car.endDate);

      let isNotBooked = hireOn >= endDate || returnOn <= startDate;
      if (!car.startDate) {
        isNotBooked = true;
      }
      if (!data.hireOn && !data.returnOn) {
        isNotBooked = true;
      }

      const isWithinPriceRange =
        car.dailyRent >= minValue && car.dailyRent <= maxValue;

      const isMatchingType =
        (!data.compact || car.type === "compact") &&
        (!data.suv || car.type === "suv") &&
        (!data.coach || car.type === "coach") &&
        (!data.mpv || car.type === "mpv") &&
        (!data.sedan || car.type === "sedan");

      const isMatchingBrand =
        (!data.proton || car.model.toLowerCase().includes("proton")) &&
        (!data.perodua || car.model.toLowerCase().includes("perodua")) &&
        (!data.toyota || car.model.toLowerCase().includes("toyota")) &&
        (!data.nissan || car.model.toLowerCase().includes("nissan")) &&
        (!data.honda || car.model.toLowerCase().includes("honda"));

      return (
        isNotBooked && isWithinPriceRange && isMatchingType && isMatchingBrand
      );
    });

    setFilter(filteredCars);
    setCurrentR(1); // Reset to the first page when filters are applied
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="ListRantel-container">
      <div className="listRentel-fl">
        <form
          onSubmit={handleSubmit(onSubmitFilter)}
          className="car-list-filter"
        >
          <div className="availability">
            <h3>AVAILABLE ON</h3>
            <div className="date-filter-container">
              <span>from</span>
              <input
                type="date"
                className="date-filter"
                placeholder="HireOn"
                {...register("hireOn")}
              />
              <span>To</span>
              <input
                type="date"
                placeholder="returnOn"
                className="date-filter"
                {...register("returnOn")}
              />
            </div>
          </div>
          <div className="price-filter">
            <label htmlFor="price">PRICE a day</label>
            <MultiRangeSlider
              min={0}
              max={100}
              step={5}
              minValue={minValue}
              maxValue={maxValue}
              onInput={handleInput}
            />
            <div className="ranged-input">
              <span>{minValue}</span> <span>{maxValue}</span>
            </div>
            <div className="fiter-chekbox">
              <h2>CATEGORY</h2>
              {["compact", "suv", "coach", "mpv", "sedan"].map((type) => (
                <div className="filter-lable" key={type}>
                  <input type="checkbox" {...register(type)} />
                  <label>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
                </div>
              ))}
            </div>
            <div className="fiter-chekbox">
              <h2>CAR BRANDS</h2>
              {["proton", "perodua", "toyota", "nissan", "honda"].map(
                (brand) => (
                  <div className="filter-lable" key={brand}>
                    <input type="checkbox" {...register(brand)} />
                    <label>
                      {brand.charAt(0).toUpperCase() + brand.slice(1)}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="filtre-actions">
            <button type="submit">Filter</button>
            <button type="button" onClick={resetFilter}>
              Reset
            </button>
          </div>
        </form>
        <div className="ListRantel">
          {dataPerPage.length > 0 ? (
            dataPerPage.map((car) => <CarCard car={car} key={car._id} />)
          ) : (
            <p>No cars available</p>
          )}
        </div>
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentR((prev) => Math.max(prev - 1, 1))}
          disabled={currentR === 1}
        >
          Prev
        </button>
        <button>{currentR}</button>
        <button
          onClick={() => setCurrentR((prev) => Math.min(prev + 1, NbPage))}
          disabled={currentR === NbPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ListRantel;
