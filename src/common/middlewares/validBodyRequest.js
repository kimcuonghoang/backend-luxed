import { z } from "zod";

const validBodyRequest = (req, res, next) => {
  try {
    const data = z.parse(req.body);
    req.data = data;
  } catch (error) {
    const err = err.errors[0];
    return res
      .status(400)
      .json({ "Valid body request": `${err.path} : ${err.message}` });
  }
};

export default validBodyRequest;
