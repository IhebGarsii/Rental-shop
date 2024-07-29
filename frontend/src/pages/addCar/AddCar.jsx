import React from "react";
import "./addCar.css";
import { useForm } from "react-hook-form";
import { addCar } from "../../apis/carApi";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

function AddCar() {
  const { register, handleSubmit } = useForm();
  const { mutate } = useMutation({
    mutationFn: addCar,
    onSuccess: (data) => {
      toast.success("Successfully created!");
    },
    onError: (error) => {
      toast.error("Error creating car", error);
    },
  });
  const submit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "image" || key === "imageInterior") {
          for (let i = 0; i < data[key].length; i++) {
            formData.append(key, data[key][i]);
          }
        } else {
          formData.append(key, data[key]);
        }
      });

      mutate(formData);
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error("Error creating car");
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
        <input type="file" multiple {...register("imageInterior")} />
        <input type="text" {...register("model")} placeholder="Car Model" />
        <input type="number" {...register("year")} placeholder="Year" />
        <input type="text" {...register("location")} placeholder="location" />
        <input
          type="text"
          {...register("interiorMaterial")}
          placeholder="interiorMaterial"
        />
        <input type="text" {...register("driveType")} placeholder="driveType" />
        <input
          type="text"
          {...register("engineCapacity")}
          placeholder="engineCapacity"
        />
        <input type="text" {...register("power")} placeholder="power" />
        <input
          type="text"
          {...register("consumption")}
          placeholder="consumption"
        />
        <input
          type="text"
          {...register("CO2emissions")}
          placeholder="CO2emissions"
        />
        <input
          type="text"
          {...register("emissionClass")}
          placeholder="emissionClass"
        />
        <input type="text" {...register("mileage")} placeholder="mileage" />
        <input type="text" {...register("condition")} placeholder="condition" />
        <input
          type="text"
          {...register("currentIssues")}
          placeholder="currentIssues"
        />
        <select {...register("transmission")}>
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>
        <input type="text" {...register("fuel")} placeholder="Fuel Type" />
        <input type="number" {...register("seats")} placeholder="Seats" />
        <input type="number" {...register("doors")} placeholder="Doors" />
        <div className="checkbox">
          <label>Air Conditioning</label>
          <input type="checkbox" {...register("airConditioning")} />
        </div>
        <div className="checkbox">
          <label>Navigation System</label>
          <input type="checkbox" {...register("navigation")} />
        </div>
        <input type="text" {...register("type")} placeholder="type" />
        <input
          type="text"
          {...register("dailyRent")}
          placeholder="Daily Rent Price"
        />

        <input
          type="text"
          {...register("conditions")}
          placeholder="Conditions"
        />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}

export default AddCar;
