const express = require("express");
const {pay} = require("../controller/paymentController");
const paymentRouter = express.Router();

paymentRouter.post("/pay", pay);

module.exports = paymentRouter;
