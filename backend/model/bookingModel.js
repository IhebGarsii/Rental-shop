const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingModel = new Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  idCar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carModel",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    default: "PENDING",
  },
  reason: {
    type: String,
  },
  dropoffLocation: {
    type: String,
  },

  pickupLocation: {
    type: String,
  },
  payCheck: {
    type: Boolean,
    default: false,
  },
  daysDiffence: {
    type: String,
  },
  fullPrice: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("bookingModel", bookingModel);
