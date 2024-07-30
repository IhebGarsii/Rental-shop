import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./updateCar.css";
import { useForm } from "react-hook-form";
import { getCar, updateCar } from "../../apis/carApi";
import { useMutation } from "@tanstack/react-query";
import Loader from "../../components/loading/Loader";

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
        setValue("location", fetchedCar.location);
        setValue("transmission", fetchedCar.transmission);
        setValue("fuel", fetchedCar.fuel);
        setValue("seats", fetchedCar.seats);
        setValue("doors", fetchedCar.doors);
        setValue("driveType", fetchedCar.driveType);
        setValue("engineCapacity", fetchedCar.engineCapacity);
        setValue("power", fetchedCar.power);
        setValue("consumption", fetchedCar.consumption);
        setValue("CO2emissions", fetchedCar.CO2emissions);
        setValue("emissionClass", fetchedCar.emissionClass);
        setValue("mileage", fetchedCar.mileage);
        setValue("currentIssues", fetchedCar.currentIssues);
        setValue("airConditioning", fetchedCar.airConditioning);
        setValue("navigation", fetchedCar.navigation);
        setValue("dailyRent", fetchedCar.dailyRent);

        setValue("conditions", fetchedCar.conditions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCar();
  }, [setValue]);
  const { mutate: mutateUpdateCar, isPending } = useMutation({
    mutationFn: (formData) => updateCar(formData, id),
    onSuccess: () => {
      navigate("/Cars");
    },
    onError: (error) => {
      console.error("Error updating car:", error);
    },
  });
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

      formData.append("location", data.location);
      formData.append("driveType", data.driveType);
      formData.append("engineCapacity", data.engineCapacity);
      formData.append("power", data.power);
      formData.append("consumption", data.consumption);
      formData.append("CO2emissions", data.CO2emissions);
      formData.append("emissionClass", data.emissionClass);
      formData.append("mileage", data.mileage);
      formData.append("currentIssues", data.currentIssues);

      formData.append("conditions", data.conditions);
      mutateUpdateCar(formData);
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <div className="updateCar">
      <form className="updateCar-form" onSubmit={handleSubmit(submit)}>
        <div className="form-group">
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
          <input
            type="text"
            {...register("driveType")}
            placeholder="driveType"
          />
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
        </div>

        <button disabled={isPending} className="add-car-btn" type="submit">
          {isPending ? <Loader /> : <span> Update</span>}
        </button>
      </form>
    </div>
  );
}

export default UpdateCar;
