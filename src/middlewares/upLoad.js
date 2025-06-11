// middleware/upLoad.js
import multer from "multer";
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig.js");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const parser = multer({ storage });

export default parser;
