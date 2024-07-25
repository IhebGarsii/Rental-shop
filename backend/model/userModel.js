const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModel = new Schema({
  email: {
    type: String,
   /* /*  required: true, 
    unique: true, */
  },
  password: {
    type: String,
   /*  required: true, */
  },
  image: {
    type: String,
  },
  firstName: {
    type: String,
   /*  required: true, */
  },
  lastName: {
    type: String,
   /*  required: true, */
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
