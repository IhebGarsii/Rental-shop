const express = require("express");
const {
  addCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
  bookCar,
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

carRouter.use(requireAuth);

carRouter.get("/getCars", getCars);

carRouter.get("/getCar/:id", getCar);

carRouter.post("/addCar", upload.array("image"), addCar);

carRouter.put("/updateCar/:id", upload.array("image"), updateCar);

carRouter.delete("/deleteCar/:id", deleteCar);



module.exports = carRouter;
