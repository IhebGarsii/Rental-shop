const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const carModel = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
    /*  required: true, */
  },
  model: {
    type: String,
    /*  required: true, */
  },
  rented: {
    type: Boolean,
    default: false,
  },
  color: {
    tryp: String,
  },
  year: {
    type: String,
  },
  transmission: {
    type: String,
    /*  required: true, */
  },
  fuel: {
    type: String,
    /*  required: true, */
  },
  seats: {
    type: String,
    /*  required: true, */
  },
  doors: {
    type: String,
    /*  required: true, */
  },
  airConditioning: {
    type: Boolean,
    /*  required: true, */
  },
  navigation: {
    type: Boolean,
    /*  required: true, */
  },
  dailyRent: {
    type: String,
    /*  required: true, */
  },
  weeklyRent: {
    type: String,
    /*  required: true, */
  },
  monthlyRent: {
    type: String,
    /*  required: true, */
  },
  conditions: {
    type: String,
    /*  required: true, */
  },
  idRenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  availableIn: {
    type: String,
  },
  startDate: {
    type: Date,
    default: new Date().toLocaleDateString(),
  },
  endDate: {
    type: Date,
    default: new Date().toLocaleDateString(),
  },
});

module.exports = mongoose.model("carModel", carModel);
