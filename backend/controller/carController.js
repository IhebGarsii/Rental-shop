const carModel = require("../model/carModel");
const bookingModel = require("../model/bookingModel");
const getCars = async (req, res) => {
  try {
    const cars = await carModel.find();
    return res.status(200).json(cars);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getCar = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await carModel.findById(id);
    return res.status(200).json(car);
  } catch (error) {
    console.log(error);
  }
};

const addCar = async (req, res) => {
  const {
    title,
    description,
    model,
    transmission,
    fuel,
    seats,
    doors,
    airConditioning,
    navigation,
    dailyRent,
    weeklyRent,
    monthlyRent,
    conditions,
    type,
    location,
    interiorMaterial,
    driveType,
    power,
    engineCapacity,
    consumption,
    CO2emissions,
    emissionClass,
    mileage,
    condition,
    currentIssues,
  } = req.body;

  const images = req.files["image"]
    ? req.files["image"].map((file) => file.originalname)
    : [];
  const imageInteriors = req.files["imageInterior"]
    ? req.files["imageInterior"].map((file) => file.originalname)
    : [];

  try {
    console.log(navigation)
    const car = new carModel({
      title,
      description,
      images,
      imageInterior: imageInteriors,
      model,
      transmission,
      fuel,
      seats,
      doors,
      airConditioning,
      navigation,
      dailyRent,
      weeklyRent,
      monthlyRent,
      conditions,
      type,
      location,
      interiorMaterial,
      driveType,
      power,
      engineCapacity,
      consumption,
      CO2emissions,
      emissionClass,
      mileage,
      condition,
      currentIssues,
    });
    const newCar = await car.save();
    return res.status(200).json(newCar);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateCar = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  try {
    const carToUpdate = await carModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!carToUpdate) {
      return res.status(404).json({ msg: "not found" });
    }
    return res.status(200).json({ msg: "Car updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    const carToDelete = await carModel.findByIdAndDelete(id);

    if (!carToDelete) {
      return res.status(404).json("Car not found");
    }

    const bookingIds = carToDelete.idBooking; // Assuming this is an array

    // Check if there are any bookings to delete
    if (bookingIds && bookingIds.length > 0) {
      // Map the array of booking IDs to an array of promises for deletion
      const deletePromises = bookingIds.map(async (bookingId) => {
        return await bookingModel.findByIdAndDelete(bookingId);
      });

      // Wait for all deletions to complete
      await Promise.all(deletePromises);
    }

    return res.status(200).json("Car and associated bookings deleted");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json("An error occurred while deleting the car and its bookings");
  }
};

const availble = async (req, res) => {
  const { idCar } = req.params;

  try {
    const cars = await carModel.find(rented === false);
  } catch (error) {}
};
const getRandomCars = async (req, res) => {
  try {
    // Get count of all cars in the database
    const count = await carModel.countDocuments();

    // Generate 5 random numbers between 0 and count-1
    const randomIndexes = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * count)
    );

    // Fetch 5 random cars based on the generated indexes
    const randomCars = await carModel.find().skip(randomIndexes[0]).limit(4);

    return res.status(200).json(randomCars);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getRentedCars = async (req, res) => {
  try {
    const cars = await carModel.find({ rented: true });
    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: "There are no rented cars" });
    }
    return res.status(200).json(cars);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
module.exports = {
  addCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
  getRandomCars,
  getRentedCars,
};
