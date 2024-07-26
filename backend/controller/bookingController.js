const bookingModel = require("../model/bookingModel");
const carModel = require("../model/carModel");
const userModel = require("../model/userModel");

const adminNotification = require("../model/adminNotification");

const bookCar = async (req, res) => {
  const { idCar, idUser } = req.params;
  const {
    dropoffLocation,
    cardNumber,
    expiryDate,
    cvv,
    licenseNumber,
    pickupLocation,
    startDate,
    endDate,
    paymentType,
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

    /*  */
    const start = new Date(startDate);
    const end = new Date(endDate);

    let timeDifference = end - start;
    const daysDiffence = timeDifference / (1000 * 3600 * 24);
    const fullPrice = paymentType * daysDiffence;
    console.log(paymentType, "paymentTypepaymentTypepaymentTypepaymentType");
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
      pickupLocation,
      daysDiffence,
      fullPrice,
      paymentType,
    });
    car.idBooking.push(booking._id);
    await car.save();
    const description = `${user.firstName} has requested a booking for ${car.model}`;
    const notification = new adminNotification({
      description,
      target: "ADMIN",
      idUser,
    });
    await notification.save();
    await booking.save();
    if (!booking) {
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
      return res.status(404).json({ errorMsg: "Booking Not Found" });
    }
    booking.status = "ACCEPTED";
    car.rented = true;
    car.idRenter.push(idUser);
    const { startDate, endDate } = req.body;

    const bookin = { startDate, endDate };
    car.bookingDuration.push(bookin);

    user.idCars.push(idCar);
    await car.save();
    await user.save();
    await booking.save();
    const description = `The admin has accepted your request to book ${car.model}`;
    const notification = new adminNotification({
      description,
      target: "USER",
      idUser,
    });
    await notification.save();
    return res.status(200).json("booking accepted");
  } catch (error) {
    return res.status(500).json(error);
  }
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
    const idUser = booking.idUser;
    const description = `The admin has refused your request to book ${car.model}`;
    const notification = new adminNotification({
      description,
      target: "USER",
      idUser,
    });
    car.bookingDuration = car.bookingDuration.filter(
      (book) =>
        book.startDate.toISOString() !== booking.startDate.toISOString() ||
        book.endDate.toISOString() !== booking.endDate.toISOString()
    );
    await car.save();
    await notification.save();
    return res.status(200).json("Booking Refused");
  } catch (error) {
    console.error(error);
  }
};

const getBooking = async (req, res) => {
  const { idUser } = req.params;
  try {
    const bookings = await bookingModel
      .find({ idUser: idUser })
      .populate({
        path: "idUser",
        populate: {
          path: "idCars",
        },
      })
      .populate("idCar");

    if (!bookings) {
      return res.status(404).json("no booking were found");
    }
    return res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
  }
};

const updateBooking = async (req, res) => {
  const { idBooking } = req.params;

  try {
    const originalBooking = await bookingModel.findById(idBooking);
    const user = await userModel.findById(originalBooking.idUser);
    const car = await carModel.findById(originalBooking.idCar);
    console.log(idBooking);
    const booking = await bookingModel.findByIdAndUpdate(idBooking, req.body, {
      new: true,
    });
    const start = new Date(req.body.startDate);
    const end = new Date(req.body.endDate);

    let timeDifference = end - start;
    const daysDiffence = timeDifference / (1000 * 3600 * 24);
    booking.daysDiffence = daysDiffence;
    booking.fullPrice = daysDiffence * car.dailyRent;

    await booking.save();

    const description = `${user.firstName} has updated his request `;
    const idUser = user._id;
    const notification = new adminNotification({
      changes: booking,
      original: originalBooking,
      description,
      target: "USER ADMIN",
      idUser,
    });
    await notification.save();

    return res.status(200).json(booking);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const deleteBooking = async (req, res) => {
  const { idBooking } = req.params;

  try {
    const booking = await bookingModel.findByIdAndDelete(idBooking);

    const car = await carModel.findById(booking.idCar);
    const userR = await userModel.findById(booking.idUser);
    if (booking.status === "ACCEPTED") {
      const idUserStr = booking.idUser.toString();
      car.idRenter = car.idRenter.filter(
        (renter) => renter.toString() !== idUserStr
      );
      const idCarStr = booking.idCar.toString();

      userR.idCars = userR.idCars.filter(
        (renter) => renter.toString() !== idCarStr
      );
      car.bookingDuration = car.bookingDuration.filter(
        (book) =>
          book.startDate.toISOString() !== booking.startDate.toISOString() ||
          book.endDate.toISOString() !== booking.endDate.toISOString()
      );
      console.log(car.bookingDuration);
      car.rented = false;
      car.idBooking.filter((id) => id.toString() !== booking._id.toString());
      await userR.save();
      await car.save();
    }
    const idUser = userR._id;
    const description = `${userR.firstName} has deleted his request to book ${car.model}`;
    const notification = new adminNotification({
      description,
      target: "USER ADMIN",
      idUser,
    });
    await notification.save();
    return res.status(200).json("booking has been deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const postRead = async (req, res) => {
  const { idUser } = req.params;
  try {
    const notification = await adminNotification.find({ idUser: idUser });
    await Promise.all(
      notification.map(async (one) => {
        one.read = "READ";
        await one.save(); // Save each notification individually
      })
    );

    return res.status(200).json("notification has been read");
  } catch (error) {
    console.log(error);
    return res.status(200).json(error);
  }
};

module.exports = {
  bookCar,
  getBookings,
  acceptBooking,
  refuseBooking,
  getBooking,
  updateBooking,
  postRead,
  deleteBooking,
};
