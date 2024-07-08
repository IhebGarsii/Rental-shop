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
  idCars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carModel",
    },
  ],
});

module.exports = mongoose.model("userModel", userModel);
