const carModel = require("../model/carModel");
const userModel = require("../model/userModel");

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

const bookCar = async (req, res) => {
  const { idCar, idUser } = req.params;

  try {
    const car = await carModel.findById(idCar);
    if (!car) {
      return res.status(203).json("car Not Found");
    }
    const user = await userModel.findById(idUser);
    if (!user) {
      return res.status(203).json("user Not Found");
    }
    car.rented = true;
    car.idRenter = idUser;
    car.startDate = req.body.startDate;
    car.endDate = req.body.endDate;
    user.idCars.push(idUser);
    await car.save();
    await user.save();
    return res.status(200).json("boocked succesfuly");
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

module.exports = { addCar, getCars, getCar, updateCar, deleteCar, bookCar };
