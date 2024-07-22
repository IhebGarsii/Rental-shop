const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const carRouter = require("./router/carRouter");
const userRouter = require("./router/userRouter");
const path = require("path");
const bookingRouter = require("./router/bookingRouter");
const notificationRouter = require("./router/notificationRouter");
const newsRouter = require("./router/newsLetterRouter");
const paymentRouter = require("./router/paymentRouter");
const carModel = require("./model/carModel");
const app = express();
app.use(express.json({ limit: "50mb" }));

app.use(cors());
app.use("/Cars", carRouter);
app.use("/User", userRouter);
app.use("/Booking", bookingRouter);
app.use("/NewsLetter", newsRouter);
app.use("/Notification", notificationRouter);
app.use("/Payment", paymentRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Bad JSON");
    return res.status(400).send({ message: "Malformed JSON" });
  }
  next();
});

app.listen(4000, () => {
  console.log("connceted to 4000");
});
mongoose
  .connect(
    "mongodb+srv://ihebgarsi78:eF6fZLri0kAppoil@rental1.vx2nfdb.mongodb.net/rental?retryWrites=true&w=majority&appName=rental1"
  )
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));
const availble = async (req, res) => {
  console.log("worked");
  try {
    const cars = await carModel.find({ rented: false });

    console.log("eee", cars);
  } catch (error) {
    console.error(error);
  }
};
availble();
