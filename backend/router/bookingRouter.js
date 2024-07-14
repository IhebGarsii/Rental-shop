const express = require("express");
const {
  bookCar,
  getBookings,
  refuseBooking,
  acceptBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} = require("../controller/bookingController");
const bookingRouter = express.Router();

bookingRouter.post("/bookCar/:idCar/:idUser", bookCar);

bookingRouter.get("/getBookings", getBookings);

bookingRouter.get("/getBooking/:idUser", getBooking);

bookingRouter.get("/refuseBooking/:idBooking", refuseBooking);

bookingRouter.put("/updateBooking/:idBooking", updateBooking);

bookingRouter.delete("/deleteBooking/:idBooking", deleteBooking);

bookingRouter.get("/acceptBooking/:idCar/:idUser/:idBooking", acceptBooking);

module.exports = bookingRouter;
