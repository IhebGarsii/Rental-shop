const express = require("express");
const { getNotification } = require("../controller/notificationController");
const { postRead } = require("../controller/bookingController");

const notificationRouer = express.Router();

notificationRouer.get("/getNotification/:idUser", getNotification);

notificationRouer.get("/postRead/:idUser", postRead);

module.exports = notificationRouer;
