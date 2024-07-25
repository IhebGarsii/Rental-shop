const express = require("express");
const {
  getNotification,
  getAdminNotification,
} = require("../controller/notificationController");
const { postRead } = require("../controller/bookingController");

const notificationRouer = express.Router();

notificationRouer.get("/getNotification/:idUser", getNotification);
notificationRouer.get("/getAdminNotifications", getAdminNotification);

notificationRouer.get("/postRead/:idUser", postRead);

module.exports = notificationRouer;
