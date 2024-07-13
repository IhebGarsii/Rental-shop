const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModel = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  cin: {
    type: String,
  },
  idCars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carModel",
    },
  ],
  roles: [
    {
      type: String,
      default: "USER",
    },
  ],
});

module.exports = mongoose.model("userModel", userModel);
