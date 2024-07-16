const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminNotification = new Schema({
  original: {
    type: Object,
  },

  changes: {
    type: Object,
  },

  description: {
    type: String,
  },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  target: {
    type: String,
  },
  read: {
    type: String,
    default: "UNREAD",
  },
});

module.exports = mongoose.model("adminNotification", adminNotification);
