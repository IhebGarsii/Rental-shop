const express = require("express");
const {
  postNewsLetter,
  subscribeNewsLetter,
} = require("../controller/newsLetterController");
const newsRouter = express.Router();

newsRouter.post("/postNewsLetter", postNewsLetter);

newsRouter.post("/subscribeNewsLetter", subscribeNewsLetter);

module.exports = newsRouter;
