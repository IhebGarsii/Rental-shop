const BASE_URL = "http://localhost:4000/Cars";

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

export const getCar = async (id) => {
  try {
    /*  return ({ data, isLoading, error } = useFetch(
      `${BASE_URL}/getCar/${id}`,
      "GET"
    )); */

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
    console.log("from the api", formData);
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
    console.log(response);
    const updatedCar = await response.json();

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
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

