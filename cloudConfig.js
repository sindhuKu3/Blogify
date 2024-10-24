const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
console.log(
  "Cloudinary Config",
  process.env.CLOUD_NAME,
  process.env.CLOUD_API_KEY
);
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blogify_DEV",
    allowedformats: ["png", "jpeg", "jpg", "webp"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
