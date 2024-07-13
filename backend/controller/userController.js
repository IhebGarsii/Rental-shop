const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const blockedEmailModel = require("../model/blockedEmail");

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
  const { email, password, firstName, lastName, cin } = req.body;
  const blocked = await blockedEmailModel.findOne();
  if (blocked.emails.includes(email)) {
    return res.status(500).json("Sorry you were blocked");
  }
  console.log(blocked.emails.includes(email));
  const image = req.file.originalname;

  try {
    const userEmail = await userModel.findOne({ email: email });

    if (userEmail) {
      return res.status(501).json("email is allready in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new userModel({
      email,
      password: hash,
      image,
      firstName,
      lastName,
      cin,
    });

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
    res.status(500).json("users not found");
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);
    if (user) {
      return res.status(200).json(user);
    }
    res.status(500).json("user not found");
  } catch (error) {
    res.status(500).json(error);
  }
};

const blockUser = async (req, res) => {
  const { idUser } = req.params;

  try {
    const user = await userModel.findByIdAndDelete(idUser);
    if (user) {
      console.log(user);
      const blocked = await blockedEmailModel.findOne();
      blocked.emails.push(user.email);
      await blocked.save();

      return res.status(200).json(user);
    }
    res.status(500).json("user not found");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { login, signup, getAllUsers, getUser, blockUser };
