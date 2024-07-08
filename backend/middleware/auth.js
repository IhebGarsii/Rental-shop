const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const requireAuth = async (req, res, next) => {
  // verify auth
  const { authorization } = req.headers;
  if (!authorization) {
    console.log("Authorization header missing.");
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  console.log("Token:", token);

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await userModel.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.error(
      "Error during token verification or user retrieval:",
      error.message
    );
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
