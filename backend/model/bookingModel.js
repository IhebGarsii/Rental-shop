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
  cardNumber: {
    type: String,
  },
  expiryDate: {
    type: String,
    match: /^(19|20)\d\d-(0[1-9]|1[0-2])$/,
  },
  cvv: {
    type: String,
  },
  licenseNumber: {
    type: String,
  },
  billingAddress: {
    type: String,
  },
  daysDiffence: {
    type: String,
  },
});

module.exports = mongoose.model("bookingModel", bookingModel);
