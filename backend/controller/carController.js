const carModel = require("../model/carModel");
const userModel = require("../model/userModel");
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
  } = req.body;
  const images = req.files.map((file) => file.originalname);

  try {
    const car = new carModel({
      title: title,
      description: description,
      images: images,
      model: model,
      transmission: transmission,
      fuel: fuel,
      seats: seats,
      doors: doors,
      airConditioning: airConditioning,
      navigation: navigation,
      dailyRent: dailyRent,
      weeklyRent: weeklyRent,
      monthlyRent: monthlyRent,
      conditions: conditions,
      type: type,
    });
    const newcar = await car.save();
    console.log(newcar);
    return res.status(200).json(newcar);
  } catch (error) {
    console.log(error);
  }
};

const updateCar = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    console.log(req.body);
    const carToUpdate = await carModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!carToUpdate) {
      return res.status(404).json({ msg: "notfound" });
    }
    return res.status(200).json("msg");
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
      return res.status(404).json("car not found");
    }
    return res.status(200).json("carDeleted");
  } catch (error) {
    console.error(error);
  }
};

const availble = async (req, res) => {
  const { idCar } = req.params;

  try {
    const cars = await carModel.find(rented === false);
    console.log(cars);
  } catch (error) {}
};
module.exports = { addCar, getCars, getCar, updateCar, deleteCar };
