const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(process.env.SECRET);
    const user = await userModel.findOne({ email: email });
    if (!user) {
      console.log("erer");
      return res.status(404).json("email not found");
    }
    console.log(user);
    const match = bcrypt.compare(password, user.password);
    const token = createToken(user._id);
    if (!match) {
      return res.status(200).json("mail & pass not match");
    }

    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  const image = req.file.originalname;
  try {
    const userEmail = await userModel.findOne({ email: email });

    if (userEmail) {
      return res.status(501).json("email is allready in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new userModel({ email, password: hash, image });

    await user.save();
    const token = createToken(user._id);
    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users) {
      return res.status(200).json(users);
    }
    res.status(500).json("user not found");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { login, signup, getAllUsers };
