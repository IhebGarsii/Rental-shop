const BASE_URL = "http://localhost:4000/Cars";
import toast from "react-hot-toast";

export const getCars = async () => {
  try {
    let methodd = "GET";
    const cars = await fetch(`${BASE_URL}/getCars`, {
      method: methodd,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const response = await cars.json();

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getRandomCars = async () => {
  try {
    let methodd = "GET";
    const cars = await fetch(`${BASE_URL}/getRandomCars`, {
      method: methodd,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const response = await cars.json();

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCar = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/getCar/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const car = await response.json();
    return car;
  } catch (error) {
    console.log(error);
  }
};

export const addCar = async (formData) => {
  try {
    const car = await fetch(`${BASE_URL}/addCar`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },

      body: formData,
    });
    if (car.ok) {
      toast.success("Successfully created!");
    } else {
      toast.error("error");
    }
    const response = await car.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const updateCar = async (formData, id) => {
  try {
    console.log("try");
    const response = await fetch(`${BASE_URL}/updateCar/${id}`, {
      method: "PUT",
      body: formData,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const updatedCar = await response.json();
    if (response.ok) {
      toast.success("Successfully Updated!");
    } else {
      toast.error("error");
    }
    return updatedCar;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCar = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/deleteCar/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (response.ok) {
      toast.success("Successfully Deleted!");
    } else {
      toast.error("error");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};


export const getRentedCars = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/getRentedCars`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const car = await response.json();
    return car;
  } catch (error) {
    console.log(error);
  }
};