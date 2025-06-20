import { ZodError } from "zod";

const validBodyRequest = (schema) => (req, res, next) => {
  try {
    const data = schema.parse(req.body); // dùng schema được truyền vào
    req.data = data;
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const err = error.errors[0];
      return res.status(400).json({
        success: false,
        message: `${err.path.join(".")} : ${err.message}`,
      });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export default validBodyRequest;
