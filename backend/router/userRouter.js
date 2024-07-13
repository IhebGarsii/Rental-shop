const express = require("express");
const userRouter = express.Router();
const {
  login,
  signup,
  getAllUsers,
  getUser,
  blockUser,
} = require("../controller/userController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/users/";

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

userRouter.post("/login", login);

userRouter.post("/signup", upload.single("image"), signup);

userRouter.get("/getAllUsers", getAllUsers);

userRouter.get("/getUser/:id", getUser);

userRouter.delete("/blockUser/:idUser", blockUser);

module.exports = userRouter;
