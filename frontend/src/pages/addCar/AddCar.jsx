import React, { useEffect } from "react";
import "./addCar.css";
import { useForm } from "react-hook-form";
import { addCar } from "../../apis/carApi";
function AddCar() {
  const { register, handleSubmit } = useForm();

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

      const car = await addCar(formData);
      console.log("Car added:", car);
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <div className="addCar">
      <form className="addCarr-form" onSubmit={handleSubmit(submit)}>
        <input type="text" {...register("title")} placeholder="name" />
        <input
          type="text"
          {...register("description")}
          placeholder="description"
        />
        <input type="file" multiple {...register("image")} />
        <input type="text" {...register("model")} placeholder="Car Model" />
        <input type="number" {...register("year")} placeholder="Year" />
        <input type="text" placeholder="Color" {...register("color")} />

        <select {...register("transmission")}>
          <option>manual</option>
          <option>automatic</option>
        </select>
        <input type="text" {...register("fuel")} placeholder="Fuel Type" />
        <input type="number" placeholder="Seats" {...register("seats")} />
        <input type="number" placeholder="Doors" {...register("doors")} />
        <div className="checkbox">
          <label htmlFor="">Air Conditioning</label>
          <input
            type="checkbox"
            name=""
            id=""
            {...register("airConditioning")}
          />
        </div>
        <div className="checkbox">
          <label htmlFor=""> Navigation System</label>
          <input type="checkbox" name="" id="" {...register("navigation")} />
        </div>
        <input
          type="text"
          placeholder="Daily Rent Price"
          {...register("dailyRent")}
        />

        <input
          type="text"
          placeholder="Weekly Rent Price"
          {...register("weeklyRent")}
        />
        <input
          type="text"
          {...register("monthlyRent")}
          placeholder="Monthly Rent Price"
        />
        <input
          type="text"
          placeholder="Conditions"
          {...register("conditions")}
        />
        <button type="submit"> Add Car</button>
      </form>
    </div>
  );
}

export default AddCar;
