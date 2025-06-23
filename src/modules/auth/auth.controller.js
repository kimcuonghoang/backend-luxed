import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../user/user.model.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import MESSAGES from "../../common/constants/message.js";
import {
  JWT_EXPIRES_FOR_MAIL,
  JWT_EXPIRES_IN,
  JWT_SECRET_KEY,
  JWT_SECRET_KEY_FOR_MAIL,
} from "../../common/configs/enviroments.js";
import sendEmail from "./../../common/utils/mailSender.js";

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
  const verifyMailToken = jwt.sign(
    { id: newUser._id },
    JWT_SECRET_KEY_FOR_MAIL,
    { expiresIn: JWT_EXPIRES_FOR_MAIL }
  );
  const verifyMailLink = `http://localhost:5173/auth/verify-mail/${verifyMailToken}`;
  sendEmail(
    newUser.email,
    "Verify your email",
    `
      Xin chao ${newUser.fullName || "User"},);
      Vui long click vào link dưới đây để xác thực email của bạn:
      <a href="${verifyMailLink}">Xác thực email</a>
      <br>
      Nếu bạn không đăng ký tài khoản này, vui lòng bỏ qua email này.
      <br>
      Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
  `
  );
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

export const authLogout = handleAsync(async (req, res, next) => {});

export const authRefreshToken = handleAsync(async (req, res, next) => {});

export const authForgotPassword = handleAsync(async (req, res, next) => {});

export const authResetPassword = handleAsync(async (req, res, next) => {});
