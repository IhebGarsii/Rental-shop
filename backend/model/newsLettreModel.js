const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newsLetterModel = new Schema({
  text: {
    type: String,
  },
  emails: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("newsLetterModel", newsLetterModel);
