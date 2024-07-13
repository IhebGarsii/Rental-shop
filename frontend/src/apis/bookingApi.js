const BASE_URL = "http://localhost:4000/Booking";

export const getBookings = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getBookings`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const bookCar = async (idCar, idUser, data) => {
  try {
    console.log("data", data);
    const response = await fetch(`${BASE_URL}/bookCar/${idCar}/${idUser}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const refuseBooking = async (idBooking) => {
  try {
    const response = await fetch(`${BASE_URL}/refuseBooking/${idBooking}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const acceptBooking = async (idCar, idUser, idBooking) => {
  try {
    const response = await fetch(
      `${BASE_URL}/acceptBooking/${idCar}/${idUser}/${idBooking}`,

      {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
