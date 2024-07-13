const express = require("express");
const {
  bookCar,
  getBookings,
  refuseBooking,
  acceptBooking,
} = require("../controller/bookingController");
const bookingRouter = express.Router();

bookingRouter.post("/bookCar/:idCar/:idUser", bookCar);

bookingRouter.get("/getBookings", getBookings);

bookingRouter.get("/refuseBooking/:idBooking", refuseBooking);

bookingRouter.get("/acceptBooking/:idCar/:idUser/:idBooking", acceptBooking);

module.exports = bookingRouter;
