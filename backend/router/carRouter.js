const express = require("express");
const {
  addCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,

  getRandomCars,
} = require("../controller/carController.js");
const multer = require("multer");
const path = require("path");
const requireAuth = require("../middleware/auth.js");
const carRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";
    if (req.baseUrl.includes("Cars")) {
      folder = "uploads/cars/";
    } else if (req.baseUrl.includes("user")) {
      folder = "uploads/users/";
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

/* carRouter.use(requireAuth); */

carRouter.get("/getRandomCars", getRandomCars);
carRouter.get("/getCars", getCars);
carRouter.get("/getCar/:id", getCar);
carRouter.post(
  "/addCar",
  upload.fields([
    { name: "image", maxCount: 10 },
    { name: "imageInterior", maxCount: 10 },
  ]),
  addCar
);
carRouter.put(
  "/updateCar/:id",
  upload.fields([
    { name: "image", maxCount: 10 },
    { name: "imageInterior", maxCount: 10 },
  ]),
  updateCar
);
carRouter.delete("/deleteCar/:id", deleteCar);

module.exports = carRouter;
