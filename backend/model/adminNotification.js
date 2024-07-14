const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminNotification = new Schema({
  original: [
    {
      type: String,
    },
  ],
  changes: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
});

module.exports = mongoose.model("adminNotification", adminNotification);
