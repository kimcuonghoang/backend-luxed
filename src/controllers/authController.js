import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import createError from "../utils/error.js";
import handleAsync from "../utils/handleAsync.js";
import createResponse from "../utils/response.js";

export const Register = handleAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return next(createError(400, "Email already exists!"));
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  return res.json(createResponse(true, 201, "Register Successfully!", newUser));
});
export const Login = handleAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(createError(400, "Invalid email or password"));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(createError(400, "Invalid email or password"));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  return res.json(createResponse(true, 200, "Login Successfully!", token));
});

export const getUser = async (req, res, next) => {
  const users = await User.find().select("-password");

  return res.json(
    createResponse(true, 200, "Get list Product successfully!", users)
  );
};
