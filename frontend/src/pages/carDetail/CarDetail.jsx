import React, { useEffect, useState } from "react";
import "./carDetail.css";
import { deleteCar, getCar } from "../../apis/carApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookCar from "../../components/bookCar/BookCar";
import { RxCross2 } from "react-icons/rx";
import Delete from "../../components/button/Delete";

function CarDetail() {
  const [car, setCar] = useState();
  const { id } = useParams();
  const [rent, setRent] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const fetchedCar = await getCar(id);
        setCar(fetchedCar);
        localStorage.setItem("idCar", fetchedCar._id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCar();
  }, []);

  
  const onDelete = async (idCar) => {
    try {
      const carToDelete = await deleteCar(idCar);
      navigate("/Cars");
    } catch (error) {
      console.log(error);
    }
  };
  const scrollLeft = () => {
    const slider = document.querySelector(".img-slider");
    const slideWidth = slider.querySelector(".one-slide").offsetWidth;
    slider.scrollBy({ left: -slideWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    const slider = document.querySelector(".img-slider");
    const slideWidth = slider.querySelector(".one-slide").offsetWidth;
    slider.scrollBy({ left: slideWidth, behavior: "smooth" });
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
  return (
    <div className="carDetail">
      {car && (
        <>
          <div className="slider-container">
            <button onClick={scrollLeft} className="button left-arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
                id="left-trans"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 12h-15m0 0l6.75-6.75M4.5 12l6.75 6.75"
                ></path>
              </svg>

              <div className="text"></div>
            </button>

            <div className="img-slider">
              {car.images.map((image, index) => (
                <img
                  key={index}
                  onClick={() => seti(index)}
                  className="one-slide"
                  src={`http://localhost:4000/uploads/cars/${image}`}
                  alt=""
                />
              ))}
            </div>

            <button onClick={scrollRight} className="button right-arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 "
                id="right-trans"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                ></path>
              </svg>

              <div className="text"></div>
            </button>
          </div>
          <div className="detail-container">
            <div className="admin-car">
              <h2 className="detail-title">Detail</h2>

              {localStorage.getItem("roles") === "ADMIN" && (
                <div className="car-detail-action">
                  <Link to={`/update/${car._id}`} className="Btn">
                    Edit
                    <svg className="svg" viewBox="0 0 512 512">
                      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                    </svg>
                  </Link>
                  <Delete onClick={() => onDelete(car._id)} />
                </div>
              )}
            </div>

            <div className="first-detail">
              <div className="lefti">
                <div className="first-lefti">
                  <div className="left-detail">
                    VEHICLE DETAIL
                    <span className="spans check-detail">
                      Seats : <span> {car.seats} </span>
                    </span>
                    <hr />
                    <span className="spans check-detail">
                      Doors :<span>{car.doors} </span>
                    </span>
                    <hr />
                    <h3 className="check-detail">
                      Air Conditioning :
                      {car.airConditioning ? (
                        <span> &#9989;</span>
                      ) : (
                        <span>&#10060;</span>
                      )}
                    </h3>
                    <hr />
                    <h3 className="check-detail">
                      Navigation {car.navigarion && <span> &#9989; </span>}:
                      <span>&#10060;</span>
                    </h3>
                    <hr />
                    <h3 className="check-detail">
                      Location : <span> {car.location}</span>
                    </h3>
                    <hr />
                    <h3 className="check-detail">
                      Interior material : <span> {car.interiorMaterial}</span>
                    </h3>
                    <hr />
                  </div>
                  <div className="left-detail">
                    VEHICLE CONDITION
                    <span className="spans check-detail">
                      Mileage : <span> {car.mileage} </span>
                    </span>
                    <hr />
                    <span className="spans check-detail">
                      Condition :<span>{car.condition} </span>
                    </span>
                    <hr />
                    <h3 className="check-detail">
                      Current issues : <span> {car.currentIssues}</span>
                    </h3>
                    <hr />
                  </div>
                </div>
                <div className="left-detail">
                  ENGINE
                  <h3 className="check-detail">
                    fuel : <span>{car.fuel}</span>
                  </h3>
                  <h3 className="check-detail">
                    Transmission : <span> {car.transmission}</span>
                  </h3>
                  <h3 className="check-detail">
                    Drive type : <span> {car.driveType}</span>
                  </h3>
                  <h3 className="check-detail">
                    Power : <span> {car.power}</span>
                  </h3>
                  <h3 className="check-detail">
                    Engine capacity : <span> {car.engineCapacity}</span>
                  </h3>
                  <h3 className="check-detail">
                    Consumption : <span> {car.consumption}</span>
                  </h3>
                  <h3 className="check-detail">
                    CO2 emissions : <span> {car.CO2emissions}</span>
                  </h3>
                  <h3 className="check-detail">
                    Emission class : <span> {car.emissionClass}</span>
                  </h3>
                </div>
              </div>
              <div className="rent-car" >
                <BookCar key={car._id} car={car} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CarDetail;
