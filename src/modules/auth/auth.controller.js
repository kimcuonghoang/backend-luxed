import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../user/user.model.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import MESSAGES from "../../common/constants/message.js";
import {
  JWT_EXPIRES_IN,
  JWT_SECRET_KEY,
} from "../../common/configs/enviroments.js";

export const Register = handleAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing)
    return next(createError(400, MESSAGES.AUTH.EMAIL_ALREADY_EXISTS));
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    role: "member",
  });
  return res.json(
    createResponse(true, 201, MESSAGES.AUTH.REGISTER_SUCCESS, newUser)
  );
});

export const Login = handleAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(createError(400, MESSAGES.AUTH.LOGIN_FAILED));
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return next(createError(400, MESSAGES.AUTH.LOGIN_FAILED));
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });
  if (token) {
    user.password = undefined;
    return res.json(
      createResponse(true, 200, MESSAGES.AUTH.LOGIN_SUCCESS, {
        user: user,
        token,
      })
    );
  }
  return next(createError(400, MESSAGES.AUTH.LOGIN_FAILED));
});
export const getUser = async (req, res, next) => {
  const users = await User.find().select("-password");
  return res.json(
    createResponse(true, 200, MESSAGES.AUTH.GET_USER_SUCCESS, users)
  );
};
