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
const multer = require("multer");

const bookingRouter = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";
    if (req.baseUrl.includes("Cars")) {
      folder = "uploads/cars/";
    } else if (req.baseUrl.includes("user")) {
      folder = "uploads/users/";
    } else {
      folder = "uploads/Licence/";
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
bookingRouter.post(
  "/bookCar/:idCar/:idUser",
  upload.single("DrivingLicence"),
  bookCar
);

bookingRouter.get("/getBookings", getBookings);

bookingRouter.get("/getBooking/:idUser", getBooking);

bookingRouter.get("/refuseBooking/:idBooking", refuseBooking);

bookingRouter.put(
  "/updateBooking/:idBooking",
  upload.single("image"),
  updateBooking
);

bookingRouter.delete("/deleteBooking/:idBooking", deleteBooking);

bookingRouter.post("/acceptBooking/:idCar/:idUser/:idBooking", acceptBooking);

module.exports = bookingRouter;
