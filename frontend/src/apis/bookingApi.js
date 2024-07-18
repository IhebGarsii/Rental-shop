const BASE_URL = "http://localhost:4000/Booking";
import toast from "react-hot-toast";

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

    if (response.ok) {
      toast.success("Car Successfully Booked!");
    } else {
      toast.error("error");
    }
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
    if (response.ok) {
      toast.success("Successfully Refused!");
    } else {
      toast.error(response.errorMsg);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteBooking = async (idBooking) => {
  try {
    const response = await fetch(`${BASE_URL}/deleteBooking/${idBooking}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (response.ok) {
      toast.success("Successfully Deleted!");
    } else {
      toast.error(response.errorMsg);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const acceptBooking = async (booking) => {
  try {
    const response = await fetch(
      `${BASE_URL}/acceptBooking/${booking.idCar}/${booking.idUser}/${booking._id}`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(booking),
      }
    );

    const accept = await response.json();

    if (response.ok) {
      toast.success("Successfully Accepted!");
    } else {
      toast.error(accept.errorMsg);
    }
    return accept;
  } catch (error) {
    console.error(error);
  }
};

export const getBooking = async (idUser) => {
  try {
    const response = await fetch(`${BASE_URL}/getBooking/${idUser}`, {
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
export const updateBookingById = async (data, idBooking) => {
  console.log("data", data);
  try {
    const response = await fetch(`${BASE_URL}/updateBooking/${idBooking}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      toast.success("Successfully Updated!");
    } else {
      toast.error(response.errorMsg);
    }
    const updatedCar = await response.json();

    return updatedCar;
  } catch (error) {
    console.log(error);
  }
};
