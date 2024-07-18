import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./updateCar.css";
import { useForm } from "react-hook-form";
import { getCar, updateCar } from "../../apis/carApi";

function UpdateCar() {
  const [car, setCar] = useState();
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const fetchedCar = await getCar(id);
        setCar(fetchedCar);
        setValue("title", fetchedCar.title);
        setValue("description", fetchedCar.description);
        setValue("model", fetchedCar.model);
        setValue("year", fetchedCar.year);
        setValue("color", fetchedCar.color);
        setValue("transmission", fetchedCar.transmission);
        setValue("fuel", fetchedCar.fuel);
        setValue("seats", fetchedCar.seats);
        setValue("doors", fetchedCar.doors);
        setValue("airConditioning", fetchedCar.airConditioning);
        setValue("navigation", fetchedCar.navigation);
        setValue("dailyRent", fetchedCar.dailyRent);
        setValue("weeklyRent", fetchedCar.weeklyRent);
        setValue("monthlyRent", fetchedCar.monthlyRent);
        setValue("conditions", fetchedCar.conditions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCar();
  }, [setValue]);

  const submit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);

      if (data.image && data.image.length > 0) {
        for (let i = 0; i < data.image.length; i++) {
          formData.append("image", data.image[i]);
        }
      }
      formData.append("model", data.model);
      formData.append("year", data.year);
      formData.append("color", data.color);
      formData.append("transmission", data.transmission);
      formData.append("fuel", data.fuel);
      formData.append("seats", data.seats);
      formData.append("doors", data.doors);
      formData.append("airConditioning", data.airConditioning);
      formData.append("navigation", data.navigation);
      formData.append("dailyRent", data.dailyRent);
      formData.append("weeklyRent", data.weeklyRent);
      formData.append("monthlyRent", data.monthlyRent);
      formData.append("conditions", data.conditions);

      const car = await updateCar(formData, id);

      navigate("/Cars");
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <div className="updateCar">
      <form className="updateCar-form" onSubmit={handleSubmit(submit)}>
        <div className="form-group">
          <label htmlFor="title">Name</label>
          <input
            type="text"
            id="title"
            {...register("title")}
            placeholder="Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            {...register("description")}
            placeholder="Description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" multiple {...register("image")} />
        </div>

        <div className="form-group">
          <label htmlFor="model">Car Model</label>
          <input
            type="text"
            id="model"
            {...register("model")}
            placeholder="Car Model"
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            {...register("year")}
            placeholder="Year"
          />
        </div>

        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            id="color"
            placeholder="Color"
            {...register("color")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="transmission">Transmission</label>
          <select id="transmission" {...register("transmission")}>
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fuel">Fuel Type</label>
          <input
            type="text"
            id="fuel"
            {...register("fuel")}
            placeholder="Fuel Type"
          />
        </div>

        <div className="form-group">
          <label htmlFor="seats">Seats</label>
          <input
            type="number"
            id="seats"
            placeholder="Seats"
            {...register("seats")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="doors">Doors</label>
          <input
            type="number"
            id="doors"
            placeholder="Doors"
            {...register("doors")}
          />
        </div>

        <div className="checkbox">
          <div className="s">
            <label htmlFor="airConditioning">Air Conditioning</label>
            <input
              type="checkbox"
              id="airConditioning"
              {...register("airConditioning")}
            />
          </div>
        </div>

        <div className=" checkbox">
          <div className="s">
            <label htmlFor="navigation">Navigation System</label>
            <input
              type="checkbox"
              id="navigation"
              {...register("navigation")}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="dailyRent">Daily Rent Price</label>
          <input
            type="text"
            id="dailyRent"
            placeholder="Daily Rent Price"
            {...register("dailyRent")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="weeklyRent">Weekly Rent Price</label>
          <input
            type="text"
            id="weeklyRent"
            placeholder="Weekly Rent Price"
            {...register("weeklyRent")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="monthlyRent">Monthly Rent Price</label>
          <input
            type="text"
            id="monthlyRent"
            {...register("monthlyRent")}
            placeholder="Monthly Rent Price"
          />
        </div>

        <div className="form-group">
          <label htmlFor="conditions">Conditions</label>
          <input
            type="text"
            id="conditions"
            placeholder="Conditions"
            {...register("conditions")}
          />
        </div>

        <button type="submit">Update Car</button>
      </form>
    </div>
  );
}

export default UpdateCar;
