const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blockedEmailModel = new Schema({
  emails: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("blockedEmailModel", blockedEmailModel);
