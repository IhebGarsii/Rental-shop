const express = require("express");
const { getNotification } = require("../controller/notificationController");
const { postRead } = require("../controller/bookingController");

const notificationRouer = express.Router();

notificationRouer.get("/getNotification", getNotification);

notificationRouer.get("/postRead", postRead);

module.exports = notificationRouer;
