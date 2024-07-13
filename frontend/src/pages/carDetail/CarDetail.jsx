import React, { useEffect, useState } from "react";
import "./carDetail.css";
import { deleteCar, getCar } from "../../apis/carApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookCar from "../../components/bookCar/BookCar";
function CarDetail() {
  const [car, setCar] = useState();
  const { id } = useParams();
  const [i, seti] = useState(0);
  const [rent, setRent] = useState(false);
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
  const onDelete = async () => {
    try {
      const carToDelete = await deleteCar(id);
      navigate("/Cars");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="carDetail">
      {car && (
        <>
          <div className="car-detail-container">
            <div className="img-containerr">
              <img
                className="first-image"
                src={`http://localhost:4000/uploads/cars/${car.images[i]}`}
                alt=""
              />
              <div className="imgs-container">
                {car.images.map((image, index) => (
                  <img
                    onClick={() => seti(index)}
                    className={
                      i === index ? "rest-images-modifed" : "rest-images"
                    }
                    src={`http://localhost:4000/uploads/cars/${image}`}
                    alt=""
                    srcset=""
                  />
                ))}
              </div>
            </div>
            <div className="car-info">
              <h1 className="car-model">{car.model}</h1>
              <p className="car-desc">{car.description}</p>
              <div className="bottom-info">
                <div className="left-detail">
                  <span className="spans"> {car.seats} Seats </span>
                  <span className="spans"> {car.doors} Doors </span>
                  <h3>
                    Air Conditioning :
                    {car.airConditioning ? (
                      <span> &#9989;</span>
                    ) : (
                      <span>&#10060;</span>
                    )}
                  </h3>
                  <h3>
                    Navigation {car.navigarion && <span> &#9989; </span>}:
                    <span>&#10060;</span>
                  </h3>
                  <h3> Transmission : {car.transmission} </h3>
                  <h3> fuel : {car.fuel} </h3>
                </div>
                <div className="table_component">
                  <table>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Daily Rent</td>
                        <td> {car.dailyRent} &#36; </td>
                      </tr>
                      <tr>
                        <td>Weakly Rent</td>
                        <td> {car.weeklyRent} &#36; </td>
                      </tr>
                      <tr>
                        <td>Monthly Rent</td>
                        <td> {car.monthlyRent} &#36; </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="car-detail-action">
            <Link to={`/update/${car._id}`}> update</Link>
            <button onClick={onDelete}>Delete</button>
          </div>
          <div className="rent-car">
            <div className="rent-btn-container">
              <button
                onClick={() => setRent(!rent)}
                disabled={car.rented}
                className="rent-btn"
              >
                {car.rented ? (
                  <span>Not Available </span>
                ) : (
                  <span>Rent Car</span>
                )}
              </button>
              <div className={rent ? "rent-form-display" : "rent-form-none"}>
                <BookCar key={car._id} car={car} />
                <button onClick={() => setRent(false)}>Close</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CarDetail;
