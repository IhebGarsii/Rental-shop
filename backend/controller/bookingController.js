const bookingModel = require("../model/bookingModel");
const carModel = require("../model/carModel");
const userModel = require("../model/userModel");
const bookCar = async (req, res) => {
  const { idCar, idUser } = req.params;
  const {
    dropoffLocation,
    cardNumber,
    expiryDate,
    cvv,
    licenseNumber,
    billingAddress,
    startDate,
    endDate,
  } = req.body;

  try {
    const car = await carModel.findById(idCar);
    if (!car) {
      return res.status(404).json({ msg: "Car not found" });
    }

    const user = await userModel.findById(idUser);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const bookings = await bookingModel.find({
      idCar: idCar,
      idUser: idUser,
    });
    if (bookings.length > 0) {
      return res.status(400).json({ msg: "You have already booked this car" });
    }
    const booking = new bookingModel({
      idUser,
      idCar,
      startDate,
      endDate,
      dropoffLocation,
      cardNumber,
      expiryDate,
      cvv,
      licenseNumber,
      billingAddress,
    });
    await booking.save();
    if (!booking) {
      return res.status(400).json({ msg: "error" });
    }

    await car.save();
    if (!car) {
      return res.status(400).json({ msg: "error" });
    }

    return res.status(200).json({ msg: "Booked successfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json(error);
  }
};

const getBookings = async (req, res) => {
  try {
    console.log("eeeee");
    const bookings = await bookingModel.find();
    if (!bookings) {
      return res.status(404).json("no booking were found");
    }
    return res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
  }
};

const acceptBooking = async (req, res) => {
  const { idCar, idUser, idBooking } = req.params;
  try {
    const car = await carModel.findById(idCar);
    if (!car) {
      return res.status(404).json("Car Not Found");
    }
    const user = await userModel.findById(idUser);
    if (!user) {
      return res.status(404).json("USer Not Found");
    }
    const booking = await bookingModel.findById(idBooking);
    if (!booking) {
      return res.status(404).json("USer Not Found");
    }
    booking.status = "ACCEPTED";
    car.rented = true;
    car.idRenter.push(idUser);
    car.startDate = booking.startDate;
    car.endDate = booking.endDate;
    user.idCars.push(idCar);
    await car.save();
    await user.save();
    await booking.save();
    return res.status(200).json("booking accepted");
  } catch (error) {}
};

const refuseBooking = async (req, res) => {
  const { idBooking } = req.params;
  try {
    const booking = await bookingModel.findById(idBooking);
    if (!booking) {
      return res.status(404).json("Booking Not Found");
    }
    booking.status = "REFUSED";

    const car = await carModel.findById(booking.idCar);
    if (!car) {
      return res.status(404).json("Car Not Found");
    }
    await booking.save();
    car.rented = false;
    return res.status(200).json("Booking Refused");
  } catch (error) {
    console.error(error);
  }
};
module.exports = { bookCar, getBookings, acceptBooking, refuseBooking };
