// import { verify } from "jsonwebtoken";
const { verify } = require("jsonwebtoken");
const User = require("../models/User");
// import { User } from "../models/User";
//  const User = require("../models/User");

const JWT_SECRET = "12345";

const authGuard = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1]; // to get the token
      const { id } = verify(token, JWT_SECRET); // to get id
      req.user = await User.findById(id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorised" });
    }
  } else {
    return res.status(401).json({ message: "Not authorised, No token" });
  }
};
module.exports = authGuard;