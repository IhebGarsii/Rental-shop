import React, { useEffect, useState } from "react";
import "./listRantel.css";
import { getCars } from "../../apis/carApi";
import MultiRangeSlider from "multi-range-slider-react";
import CarCard from "../../components/carCard/CarCard";
import { useForm } from "react-hook-form";
function ListRantel() {
  const { register, handleSubmit, reset } = useForm();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState([]);
  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);
  const [currentR, setCurrentR] = useState(1);
  const [currentE, setCurrentE] = useState(1);

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
  const resetFilte = () => {
    reset();
    setFilter(cars);
  };
  const items = 8;

  const NbPage = Math.ceil(filter.length / items);

  const startIdenx = (currentR - 1) * items;
  const endIndex = startIdenx + items;
  const DataPerPageR = filter.slice(startIdenx, endIndex);

  const onSubmitFiltre = (data) => {
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
        console.log("went in");
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
      console.log(isNotBooked);
      return (
        isNotBooked && isWithinPriceRange && isMatchingType && isMatchingBrand
      );
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
    <div className="ListRantel-container">
      <div className="listRentel-fl">
        <form
          onSubmit={handleSubmit(onSubmitFiltre)}
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
              onInput={(e) => {
                handleInput(e);
              }}
            />
            <div className="ranged-input">
              <span> {minValue} </span> <span> {maxValue} </span>
            </div>
            <div className="fiter-chekbox">
              <h2>CATEGORY</h2>
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
            <div className="fiter-chekbox">
              <h2>CAR BRANDS</h2>
              <div className="filter-lable">
                <input type="checkbox" {...register("proton")} />

                <label htmlFor="">proton</label>
              </div>
              <div className="filter-lable">
                <input type="checkbox" {...register("perodua")} />

                <label htmlFor="">Perodua</label>
              </div>
              <div className="filter-lable">
                <input type="checkbox" {...register("toyota")} />

                <label htmlFor="">Toyota</label>
              </div>

              <div className="filter-lable">
                <input type="checkbox" {...register("nissan")} />
                <label htmlFor="MPV">Nissan</label>
              </div>
              <div className="filter-lable">
                <input type="checkbox" {...register("honda")} />
                <label htmlFor="">Honda</label>
              </div>
            </div>
          </div>
          <div className="filtre-actions">
            <button type="submit">filtre</button>
            <button onClick={resetFilte}>Reset</button>
          </div>
        </form>
        <div className="ListRantel">
          {cars &&
            DataPerPageR.map((car) => <CarCard car={car} key={car._id} />)}
        </div>
      </div>
      <div className="paggination">
        <button
          onClick={() => setCurrentR((prev) => Math.max(prev - 1, 1))}
          disabled={currentR === 1}
        >
          prev
        </button>
        <button>{currentR}</button>
        <button
          onClick={() => setCurrentR((prev) => Math.min(prev + 1, NbPage))}
          disabled={currentR === NbPage}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default ListRantel;
