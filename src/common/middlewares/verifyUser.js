import { JWT_SECRET_KEY } from "../configs/enviroments.js";
import createError from "../utils/error.js";
import handleAsync from "../utils/handleAsync.js";
import jwt from "jsonwebtoken";
import User from "../../modules/user/user.model.js";
export const verifyUser = handleAsync(async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.json(
      createError(401, "Unauthorized access. No token provided.")
    );
  }
  const decoded = jwt.verify(token, JWT_SECRET_KEY);
  if (!decoded) {
    return res.json(createError(401, "Unauthorized access. Invalid token."));
  }
  const user = await User.findById(decoded.id);
  if (!user) {
    return res.json(createError(404, "User not found."));
  }
  req.user = decoded;
  next();
});
